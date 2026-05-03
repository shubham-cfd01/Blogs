---
title: 'Inside the ECM — Where the Equations Come From'
date: 2026-05-03
description: A ground-up derivation of the 1-RC equivalent circuit model — from physical intuition to the ODE, its solution, and how to read parameters off a voltage curve.
tags: [battery, ecm, modeling, math]
---

The ECM parameter extraction post showed *what* to measure and *which* equations to fit. This post shows *why* those equations are exactly right — derived from scratch, keeping every step visible.

## Three things happen inside a battery at three different speeds

When current flows through a lithium-ion cell, three separate physical processes activate simultaneously — but on completely different timescales:

**1. Ohmic drop** *(microseconds)*
Electrons through metal and ions through electrolyte hit resistive friction immediately. The voltage response is instantaneous. This is $R_0$.

**2. Double-layer polarisation** *(seconds)*
At each electrode surface, ions rearrange into a charged layer — like a capacitor charging up. It builds over seconds and relaxes over seconds when current stops. This is the $R_1, C_1$ branch.

**3. Diffusion polarisation** *(minutes)*
Lithium must diffuse into solid electrode particles. Concentration gradients take minutes to build and minutes to dissipate. This is the second RC branch in a 2-RC model.

When *none* of these are active — after a long enough rest — the terminal voltage equals the **Open-Circuit Voltage (OCV)**: a thermodynamic quantity that depends only on how much lithium is stored (i.e., SOC).

---

## Building the Thévenin (1-RC) circuit

The circuit captures the first two processes:

```
      R₀           R₁
(+)──/\/\/──────┬──/\/\/──┐────(+)
                │          │
    OCV(SOC)   C₁   V₁   ===   V_t
                │          │
(−)─────────────┴──────────┘────(−)
```

- $R_0$: series resistance — causes the *instantaneous* voltage drop at pulse onset
- $R_1, C_1$ in parallel: the polarisation branch — voltage $V_1$ builds slowly across it
- $V_t$: what the voltmeter reads at the terminals

Convention: **current positive on discharge**. Pick one and never change it.

---

## Deriving the governing equation

Two laws. That's all.

### KVL around the outer loop

Going from negative terminal, through the battery, back out:

$$
V_t = \mathrm{OCV} - I \cdot R_0 - V_1 \tag{A}
$$

This is purely algebraic — it gives $V_t$ at every instant from OCV, current, and $V_1$. The only unknown that changes over time is $V_1$.

### KCL at the RC branch

The current $I$ splits between the resistor and capacitor:

$$
I = \underbrace{\frac{V_1}{R_1}}_{\text{through }R_1} + \underbrace{C_1 \frac{dV_1}{dt}}_{\text{through }C_1}
$$

Rearrange to isolate $\frac{dV_1}{dt}$, and define $\tau_1 = R_1 C_1$:

$$
\boxed{\frac{dV_1}{dt} = -\frac{V_1}{\tau_1} + \frac{I}{C_1}} \tag{B}
$$

**That's the governing ODE.** Equations A and B together fully describe the 1-RC ECM. Everything else is just solving them.

**Reading Equation B term by term:**
- $-V_1/\tau_1$: the resistor bleeds the capacitor back toward zero — forgetting the past
- $+I/C_1$: the current charges the capacitor — building up polarisation

The balance between these two terms gives the characteristic curved, exponential shape on a battery voltage trace.

---

## Solving the ODE

Equation B is a first-order linear ODE. When $I$ is constant (as in each phase of an HPPC pulse), the solution is:

$$
\boxed{V_1(t) = V_1(t_0)\, e^{-(t-t_0)/\tau_1} + I \cdot R_1 \left[1 - e^{-(t-t_0)/\tau_1}\right]} \tag{Master}
$$

This is the **master solution**. Every HPPC phase is just a special case of it.

**Term 1** — memory of the initial condition: decays to zero at rate $1/\tau_1$

**Term 2** — response to the applied current: grows from zero toward the steady-state value $I \cdot R_1$

The cell "forgets" where it started and "learns" the new current level, transitioning at speed $\tau_1$.

---

## Two special cases cover every HPPC phase

### During a pulse (current on, $V_1(t_0) = 0$)

If the cell was fully rested before the pulse:

$$
V_1(t) = I \cdot R_1 \left[1 - e^{-t/\tau_1}\right]
$$

$$
V_t(t) = \mathrm{OCV} - I \cdot R_0 - I \cdot R_1 \left[1 - e^{-t/\tau_1}\right]
$$

At $t = 0^+$: voltage drops by $I \cdot R_0$ instantly (the $R_0$ step). Then it curves further as $V_1$ builds. If the pulse ran forever, $V_t$ would settle at $\mathrm{OCV} - I(R_0 + R_1)$.

### During rest (current off, $I = 0$)

$$
V_1(t') = V_1(t_p)\, e^{-t'/\tau_1}
$$

$$
V_t(t') = \mathrm{OCV} - V_1(t_p)\, e^{-t'/\tau_1}
$$

where $t' = t - t_p$ is time since the pulse ended. $V_1$ decays purely exponentially back toward zero. This is the clean exponential relaxation visible on the oscilloscope — the shape that contains $R_1$ and $\tau_1$.

---

## Why the HPPC test has two different rests

This is the most common source of confusion in the test protocol. The two rests have completely different purposes.

### Short rest (~40 s) — between discharge and charge pulse

**Goal:** let the fast RC branch ($\tau_1$, seconds) decay so the charge pulse starts from a clean slate.

After 40 s $\gg \tau_1$, the fast polarisation is gone. The cell is *not* in thermodynamic equilibrium — slow diffusion effects still linger. But that's fine: you only need a clean initial condition for the next pulse, not true OCV.

**What you extract:** nothing — it's just a buffer.

### Long rest (~30 min) — after the pulse pair

**Goal:** let *all* polarisation — both fast ($\tau_1$, seconds) and slow diffusion ($\tau_2$, minutes) — fully decay so the terminal voltage equals true OCV.

For NMC at 25 °C, $\tau_2$ is typically 200–600 s. After 30 min = 1800 s, even $5\tau_2$ has elapsed. What you measure is genuinely OCV.

**What you extract:** OCV at this SOC — the thermodynamic open-circuit voltage used in Eq. A.

> **If you skip the long rest and record OCV after only 40 s, you get the wrong OCV table.** The measured voltage still carries slow diffusion polarisation. Every SOC estimate from the BMS will be biased for the life of the cell.

| | Short rest | Long rest |
|---|---|---|
| Duration | ~40 s ($\gg \tau_1$, $\ll \tau_2$) | ~30 min ($\gg \tau_2$) |
| Position | Between discharge and charge pulse | After both pulses |
| Purpose | Reset fast RC for clean charge pulse | Reach thermodynamic equilibrium |
| What you measure | Nothing useful | OCV(SOC) |

---

## Reading parameters off the voltage curve

### $R_0$ — the instantaneous jump

At pulse onset, $V_1$ cannot change instantaneously (capacitor voltage is continuous). Only the $I \cdot R_0$ term responds immediately:

$$
\boxed{R_0 = \frac{V_t(0^-) - V_t(0^+)}{I_{\text{pulse}}}}
$$

Use the voltage one sample *after* the step — not the very first point, which can include measurement settling and test-rig ringing.

### $R_1$ and $\tau_1$ — from the relaxation

During the short rest, $V_t$ follows a decaying exponential. Fit:

$$
V_t(t') = \mathrm{OCV} - A\, e^{-t'/\tau_1}
$$

with nonlinear least squares. The fit gives $A$ and $\tau_1$ directly. Then:

$$
R_1 = \frac{A}{I_d \left[1 - e^{-t_p/\tau_1}\right]}, \qquad C_1 = \frac{\tau_1}{R_1}
$$

The rest window is cleaner than the pulse window — no current noise riding on top of the exponential.

---

## Putting it on a microcontroller — the discrete update

In a BMS, the current changes every sample. The master solution chains across each constant-current interval exactly:

$$
\boxed{V_1[k+1] = V_1[k]\, e^{-\Delta t/\tau_1} + I[k] \cdot R_1 \left[1 - e^{-\Delta t/\tau_1}\right]}
$$

This is **exact** — not an Euler approximation. It works for any sample time $\Delta t$, even if $\Delta t \gg \tau_1$. One `exp()` call per step; the same cost as Euler but without accumulated error. This equation runs inside every Kalman filter SOC estimator at each timestep.

The full update at each step:

$$
\mathrm{SOC}[k+1] = \mathrm{SOC}[k] - \frac{I[k]\,\Delta t}{Q_{\text{nom}}}
$$

$$
V_t[k] = \mathrm{OCV}(\mathrm{SOC}[k]) - I[k] \cdot R_0 - V_1[k]
$$

The ECM produces a predicted terminal voltage $V_t[k]$ at every timestep. The Kalman filter compares this prediction to the measured voltage and corrects the SOC estimate. The parameters $R_0$, $R_1$, $\tau_1$ — extracted from HPPC — are what make that prediction accurate.
