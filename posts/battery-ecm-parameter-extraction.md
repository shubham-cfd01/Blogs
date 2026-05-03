---
title: 'Battery ECM Model — Parameter Extraction'
date: 2026-05-03
description: A short, practical guide to extracting parameters for an Equivalent Circuit Model of a lithium-ion cell from HPPC pulse data.
tags: [battery, ecm, modeling]
published: true
---

A short note on extracting parameters for an Equivalent Circuit Model (ECM) of a lithium-ion cell from pulse data. ECMs are the workhorse for any BMS, SOC estimator, or pack-level simulator that has to run in real time — small, fast, and accurate enough when the parameters are honest.

## Why an equivalent circuit?

Battery models split into electrochemical (P2D, single-particle) and equivalent-circuit. The first is right for cell design and aging studies; the second is right for anything that has to run on a microcontroller. An ECM reproduces *terminal* behaviour without claiming any of its components map onto real physics — exactly the trade you want for online estimation.

## ECM topologies

Three are standard:

- **Rint** — just $R_0$ in series with OCV. Captures the IR drop, nothing else.
- **Thévenin (1-RC)** — $R_0$ plus one parallel $R_1 \, C_1$ branch. Captures the dominant relaxation. The workhorse.
- **2-RC** — two RC branches: a fast one (charge-transfer, a few seconds) and a slow one (diffusion, a few minutes).

For 1-RC,

$$
\tau_1 = R_1 C_1
$$

$$
\frac{dV_1}{dt} = -\frac{V_1}{\tau_1} + \frac{i(t)}{C_1}
$$

$$
V(t) = \mathrm{OCV}(\mathrm{SOC}) - R_0 \, i(t) - V_1(t)
$$

Pick a sign convention and never change it. I use *current positive on discharge*.

## HPPC procedure

Hybrid Pulse Power Characterization, per the INL battery test manual. At each SOC step (10% across most of the range, 5% at the corners):

1. 1 C discharge pulse for 10 s
2. Rest 40 s
3. 0.75 C charge pulse for 10 s
4. Rest 30 minutes — record the voltage as OCV at this SOC
5. Discharge to the next SOC step

Repeat at multiple temperatures (typically -10, 0, 25, 45 °C).
![Simulated vs measured terminal voltage on a dynamic discharge profile](/images/voltage_comparison.png)

## Extracting parameters

**OCV.** Take the voltage at the end of each 30-minute rest as OCV at that SOC and interpolate with a monotone cubic (PCHIP). Hysteresis is real — a few mV for NMC, larger for LFP.

![OCV–SOC curve extracted from rest voltages at 25 °C](/images/ocv_soc_curve.png)

**R0.** At pulse onset, voltage drops instantaneously:

$$
R_0 = \frac{V(t^-) - V(t^+)}{i_{\text{pulse}}}.
$$

Pick $V(t^+)$ one sample after the step. Skip the first few milliseconds — that ringing is your test rig, not the cell.

**R1, τ1.** With $R_0$ known, the rest of the pulse is the RC branch. During the pulse,

$$
V(t) = \mathrm{OCV} - R_0 \, i - R_1 \, i \left( 1 - e^{-t/\tau_1} \right);
$$

during the rest after the pulse,

$$
V(t) = \mathrm{OCV} - R_1 \, i \, e^{-(t - t_0)/\tau_1}.
$$
![Discharge–charge pulse pairs at three SOC levels](/images/pulse_pairs_3soc.png)

Fit either window with nonlinear least squares. The rest window is usually cleaner — no current noise on top of the relaxation. Repeat at every SOC and temperature; the output is three maps, $R_0(\mathrm{SOC}, T)$, $R_1(\mathrm{SOC}, T)$, and $\tau_1(\mathrm{SOC}, T)$. Those maps *are* the ECM.

![Extracted R0, R1, and τ1 as a function of SOC and temperature](/images/params_publication.png)

## Validation

With the maps in hand, simulate the model against a drive-cycle discharge and overlay the measured terminal voltage. A well-characterised 1-RC model typically lands within ±10 mV RMS across the full SOC range at the characterisation temperatures.


