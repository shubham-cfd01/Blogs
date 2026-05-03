---
title: 'Inside the ECM — Where the Equations Come From'
date: 2026-05-03
description: A ground-up derivation of the 1-RC equivalent circuit model — from physical intuition through KVL and KCL to the analytical solution and its discrete-time form.
tags: [battery, ecm, modeling, math]
---

The [parameter extraction post](/posts/battery-ecm-parameter-extraction) showed *which* equations to fit. This post derives *why* those equations are exactly right — from first principles, one step at a time.

## Three physical processes, three timescales

When current flows through a lithium-ion cell, three processes activate simultaneously:

**Ohmic drop** *(microseconds)*
Electrons through metal current collectors and ions through the electrolyte separator encounter resistive friction. The voltage response is instantaneous on any engineering timescale. Modelled by $R_0$.

**Double-layer polarisation** *(seconds)*
At each electrode–electrolyte interface, ions rearrange into a charged double layer — physically a capacitor. It charges over seconds and dissipates over seconds when current stops. Modelled by the $R_1$–$C_1$ parallel branch.

**Solid-state diffusion** *(minutes)*
Lithium must diffuse through solid electrode particles to the reaction sites. Concentration gradients take minutes to build and minutes to relax. Modelled by a second RC branch ($R_2$, $C_2$) in a 2-RC model.

When *none* of these are active — after a sufficiently long rest — the terminal voltage equals the **Open-Circuit Voltage**: a thermodynamic quantity that depends only on lithium stoichiometry, i.e., on SOC.

---

## The Thévenin (1-RC) circuit

The 1-RC model captures ohmic drop and double-layer polarisation:

```
         R₀              R₁
(+)────/\/\/────────┬────/\/\/────┐────(+)
                    │              │
         OCV(SOC)  C₁    V₁      ═══   V_t
                    │              │
(−)─────────────────┴──────────────┘────(−)
```

- $R_0$ — series resistance; causes the *instantaneous* voltage step when current switches on or off
- $R_1$, $C_1$ in parallel — polarisation branch; the voltage $V_1$ across it evolves continuously
- $V_t$ — terminal voltage; what the voltmeter measures

**Sign convention:** current $I$ is **positive on discharge** throughout. Fix this and never change it.

---

## Governing equations from KVL and KCL

### Eq. A — Terminal voltage (KVL)

Kirchhoff's Voltage Law around the outer loop gives the terminal voltage directly:

$$
V_t = \mathrm{OCV}(\mathrm{SOC}) - I\,R_0 - V_1 \tag{A}
$$

This is algebraic — it holds at every instant given OCV, $I$, and $V_1$. The only quantity with its own dynamics is $V_1$.

### Eq. B — Polarisation voltage (KCL)

Current entering the RC branch splits between $R_1$ and $C_1$:

$$
I = \frac{V_1}{R_1} + C_1\,\frac{dV_1}{dt}
$$

Solving for $\dot{V}_1$ and substituting $\tau_1 = R_1 C_1$:

$$
\boxed{\frac{dV_1}{dt} = -\frac{V_1}{\tau_1} + \frac{I}{C_1}} \tag{B}
$$

Equations A and B together **fully describe the 1-RC ECM**. There is nothing else.

**Intuition for Eq. B:**
- The $-V_1/\tau_1$ term: $R_1$ continuously discharges $C_1$ toward zero — the system forgets its past.
- The $+I/C_1$ term: current charges $C_1$ — the system responds to the present input.
- The steady state ($\dot{V}_1 = 0$) is $V_1 = I R_1$, reached asymptotically at rate $1/\tau_1$.

---

## Analytical solution

Eq. B is a first-order linear ODE with constant coefficients. For piecewise-constant current — constant over any interval $[t_0,\, t]$ — the exact solution is:

$$
\boxed{V_1(t) = V_1(t_0)\,e^{-(t-t_0)/\tau_1} + I\,R_1\!\left[1 - e^{-(t-t_0)/\tau_1}\right]} \tag{Master}
$$

**Term 1** — initial condition memory: decays exponentially at rate $1/\tau_1$. At $t = t_0$ it equals $V_1(t_0)$; as $t \to \infty$ it vanishes.

**Term 2** — forced response: zero at $t = t_0$; approaches the steady-state value $I R_1$ as $t \to \infty$.

The solution interpolates smoothly from $V_1(t_0)$ toward $I R_1$, with the transition speed set by $\tau_1$. This is exactly the exponential shape visible on every battery voltage trace.

*Verification:* differentiating the master solution and substituting into Eq. B confirms it satisfies the ODE for all $t \geq t_0$. ✓

---

## Two exact special cases

### Current applied from rest — $V_1(t_0) = 0$

If the cell is fully relaxed before current is applied, the first term vanishes:

$$
V_1(t) = I\,R_1\!\left[1 - e^{-t/\tau_1}\right]
$$

$$
V_t(t) = \mathrm{OCV} - I\,R_0 - I\,R_1\!\left[1 - e^{-t/\tau_1}\right]
$$

At $t = 0^+$: $V_t$ drops (or rises, for charge) by exactly $I R_0$ — instantaneously. The RC branch has not yet responded. $V_t$ then curves further as $V_1$ builds toward $I R_1$. The long-time asymptote, if current were held forever, would be $\mathrm{OCV} - I(R_0 + R_1)$.

### Current removed — $I = 0$

With $t' = t - t_0$ measured from the moment current stops:

$$
V_1(t') = V_1(t_0)\,e^{-t'/\tau_1}
$$

$$
V_t(t') = \mathrm{OCV} - V_1(t_0)\,e^{-t'/\tau_1}
$$

$V_t$ jumps immediately by $I R_0$ when current switches off (R₀ drop disappears instantly), then recovers exponentially toward OCV as $V_1$ decays. The relaxation is a pure single exponential — the cleanest signal for estimating $R_1$ and $\tau_1$.

---

## Discrete-time update for BMS implementation

In real operation the current is arbitrary and sampled at fixed interval $\Delta t$. Applying the master solution over each sample interval exactly — no approximation — gives:

$$
\boxed{V_1[k+1] = V_1[k]\,e^{-\Delta t/\tau_1} + I[k]\,R_1\!\left[1 - e^{-\Delta t/\tau_1}\right]}
$$

$$
\mathrm{SOC}[k+1] = \mathrm{SOC}[k] - \frac{I[k]\,\Delta t}{Q_{\mathrm{nom}}}
$$

$$
V_t[k] = \mathrm{OCV}\!\left(\mathrm{SOC}[k]\right) - I[k]\,R_0 - V_1[k]
$$

This update is **exact for piecewise-constant current** — not an Euler approximation. It is stable for any $\Delta t$, including $\Delta t \gg \tau_1$, and costs one `exp()` evaluation per step. This is the prediction equation inside an Extended Kalman Filter (EKF) SOC estimator: $V_t[k]$ is the model prediction; the residual against measured terminal voltage drives the state correction.

Euler ($V_1[k+1] \approx V_1[k] + \Delta t \cdot \dot{V}_1[k]$) accumulates error when $\Delta t/\tau_1$ is not small. The exact exponential form eliminates this at identical computational cost.
