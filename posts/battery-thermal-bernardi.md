---
title: 'Deriving the Bernardi Heat Generation Equation from First Principles'
date: 2026-05-10
description: A ground-up derivation of the Bernardi (1985) heat generation equation — from the First Law through Faraday's Law, the Nernst equation, and the Maxwell relation — with every term defined and every assumption stated.
tags: [battery, thermal, modeling, thermodynamics]
published: true
---

Every lithium-ion battery generates heat during operation. That heat feeds back into the same chemistry that produced it, accelerating degradation and — at the extremes — triggering thermal runaway. The Bernardi equation (1985) is the foundation of almost all battery thermal models:

$$
q = \frac{I}{V_b}(E_{oc} - V_T) - \frac{I}{V_b}\,T\frac{\partial E_{oc}}{\partial T}
$$

Every symbol here is measurable at the cell terminals. The derivation runs as two parallel tracks that meet at this equation.

**Track A** (energy balance): apply the First Law, use Faraday's Law to connect current to the reaction rate, and arrive at a master equation $\dot{Q}_{gen} = \dot{H}_{rxn} - V_T I$. This tells us that heat generated equals enthalpy released minus work extracted — but $\dot{H}_{rxn}$ is still unknown.

**Track B** (thermodynamics): use Gibbs free energy, the Nernst equation, and the Maxwell relation to express $\dot{H}_{rxn}$ entirely in measurable electrical quantities.

Substituting Track B into Track A gives Bernardi.

---

## Track A — Energy balance

Fix the system boundary as the entire battery cell. Two things cross it: electrons carry electrical work out through the load, and heat flows across the surface. All atoms and ions stay inside.

The cell's internal energy has two parts: $U_{chem}$ (energy stored in the lithium intercalation state — decreases during discharge) and $U_{therm}$ (vibrational energy of all atoms — increases as the cell warms). The First Law in rate form, with $\dot{Q}_{in}$ as heat into the cell and $V_T I$ as electrical work leaving:

$$
\frac{dU_{sys}}{dt} = \dot{Q}_{in} - V_T I \tag{1}
$$

To make progress we need $dU_{chem}/dt$ — the rate at which chemical energy is being consumed. That rate is set by how fast lithium moves between electrodes, which is set entirely by the current.

### Faraday's Law gives the molar flow rate

The Faraday constant is not empirical: one mole of electrons carries $F = N_A \cdot e = 96\,485$ C mol⁻¹. For the intercalation reaction $\text{Li} \to \text{Li}^+ + e^-$, one electron transfers per lithium atom ($n = 1$). Faraday's Law of Electrolysis (1834) states $Q = nFN$ where $N$ is moles transferred. Differentiating:

$$
\boxed{\dot{n} = \frac{I}{nF}} \tag{2}
$$

At 3 A: $\dot{n} = 3/96\,485 \approx 31$ micromoles of lithium per second.

### Master equation

Each mole of lithium released changes chemical energy by $\Delta H_{rxn}$ (using $\Delta U_{rxn} \approx \Delta H_{rxn}$ for solid/liquid electrodes where $P\Delta V \approx 0$). Defining $\dot{H}_{rxn} \equiv -(I/nF)\,\Delta H_{rxn} > 0$:

$$
\frac{dU_{chem}}{dt} = -\dot{H}_{rxn} \tag{3}
$$

At steady state ($dT/dt = 0$), $dU_{sys}/dt = dU_{chem}/dt = -\dot{H}_{rxn}$. Substitute into Eq. 1 and define $\dot{Q}_{gen} = -\dot{Q}_{in}$ (positive heat generated):

$$
\boxed{\dot{Q}_{gen} = \dot{H}_{rxn} - V_T I} \tag{4}
$$

This master equation says: heat generated = all chemical energy released − electrical work extracted to the load. Track A stalls here — $\dot{H}_{rxn}$ is known to exist but not yet measurable.

---

## Track B — Thermodynamics

### OCV is Gibbs energy per coulomb (Nernst)

The **physical intuition** first: voltage is chemical potential in electrical units. When lithium moves from the high-potential anode to the low-potential cathode, it "falls" through a chemical potential difference that drives electrons through the external circuit. At zero current — open circuit — no energy is lost to resistance or kinetics, so the measured voltage is a perfect thermodynamic ruler of that potential difference.

Formally, the Clausius inequality bounds the maximum work a reaction can do at constant $T$ and $P$:

$$
W'_{max} = -\Delta G_{rxn} \tag{5}
$$

Per mole of reaction, $n$ moles of electrons pass through voltage $E_{oc}$, so $W'_{max} = nFE_{oc}$. Setting these equal:

$$
\boxed{E_{oc} = \frac{-\Delta G_{rxn}}{nF}} \tag{6}
$$

Units check: $\text{J mol}^{-1}/(\text{C mol}^{-1}) = \text{J/C} = \text{V}$. OCV in volts is Gibbs energy per coulomb of charge transferred. The OCV curve you measure sweeping through SOC is this equation traced continuously as the reaction quotient $Q_r = a_\text{products}/a_\text{reactants}$ shifts with lithium stoichiometry.

### OCV slope measures reaction entropy (Maxwell relation)

Since $G = H - TS$, the Gibbs relation at constant pressure gives the exact identity:

$$
\left(\frac{\partial G}{\partial T}\right)_P = -S \implies \left(\frac{\partial \Delta G_{rxn}}{\partial T}\right)_P = -\Delta S_{rxn}
$$

Substituting Eq. 6 ($\Delta G_{rxn} = -nFE_{oc}$):

$$
\boxed{\frac{\partial E_{oc}}{\partial T} = \frac{\Delta S_{rxn}}{nF}} \tag{7}
$$

The slope of OCV versus temperature at fixed SOC directly measures the reaction entropy. In practice: charge to a target SOC, rest until equilibrium, record OCV at two temperatures, divide $\Delta E_{oc}$ by $\Delta T$. No calorimetry needed.

### $\Delta H_{rxn}$ in measurable form

From $\Delta G_{rxn} = \Delta H_{rxn} - T\,\Delta S_{rxn}$, substitute Eq. 6 and Eq. 7:

$$
\Delta H_{rxn} = -nFE_{oc} + T\cdot nF\frac{\partial E_{oc}}{\partial T}
$$

Multiply by $-I/nF$ to get the rate form $\dot{H}_{rxn} = -(I/nF)\,\Delta H_{rxn}$, and $nF$ cancels:

$$
\boxed{\dot{H}_{rxn} = I\!\left[E_{oc} - T\frac{\partial E_{oc}}{\partial T}\right]} \tag{8}
$$

Everything is now electrically measurable: current, OCV after rest, temperature, OCV slope over temperature. Track B is complete.

---

## Convergence: substituting into the master equation

Write $\dot{Q}_{gen} = q\cdot V_b$ (distributing heat over the cell volume $V_b$). Substitute Eq. 8 into Eq. 4 and divide by $V_b$:

$$
\boxed{q = \underbrace{\frac{I}{V_b}(E_{oc} - V_T)}_{q_{irr}} \;-\; \underbrace{\frac{I}{V_b}\,T\frac{\partial E_{oc}}{\partial T}}_{q_{rev}}} \tag{9}
$$

This is the **Bernardi equation** (1985).

---

## The two terms

**Irreversible heat $q_{irr}$** — the gap $(E_{oc} - V_T)$ is the total overpotential: ohmic resistance, charge-transfer activation energy at the electrode surface, and concentration polarisation from lithium depletion near the electrode. Every mechanism converts energy to heat. Since $(E_{oc} - V_T) \approx IR_{int}$, we have $q_{irr} \propto I^2$ — the Joule heating quadratic. Always non-negative.

**Reversible heat $q_{rev}$** — not a dissipation loss. It is thermodynamically required heat exchange due to the reaction's entropy change (from the Clausius proof, $Q_{rev} = T\,\Delta S_{rxn}$). A cell with zero internal resistance still has it. It scales linearly with $I$ — dominating over the quadratic $q_{irr}$ at low C-rates — and **its sign depends on SOC**:

| $\partial E_{oc}/\partial T$ | Physical meaning | Effect |
|---|---|---|
| $> 0$ | Reaction is endothermic | $q_{rev} < 0$ — cell absorbs heat, total heating reduced |
| $< 0$ | Reaction is exothermic | $q_{rev} > 0$ — cell releases extra heat on top of Joule heating |

The same cell can partially cool the environment at one SOC and add extra heat at another. Viswanathan et al. (2010) showed $q_{rev}$ is 20–40% of total heat at C/5 and below.

---

## Numerical example

**18650 NMC/graphite at 1C, 50% SOC:**

| Parameter | Value |
|---|---|
| $I$ | 3 A |
| $V_b$ | $16.5\times10^{-6}$ m³ |
| $E_{oc}$ | 3.85 V, $V_T$ = 3.72 V |
| $T$ | 298 K |
| $\partial E_{oc}/\partial T$ | $-1.0\times10^{-4}$ V K⁻¹ |

$$
q_{irr} = \frac{3}{16.5\times10^{-6}} \times 0.13 = 23\,636\;\text{W m}^{-3}
$$

$$
q_{rev} = -\frac{3}{16.5\times10^{-6}} \times 298 \times (-1.0\times10^{-4}) = +5\,418\;\text{W m}^{-3}
$$

$$
q = 29\,054\;\text{W m}^{-3}
$$

A Joule-only model predicts 23 636 W m⁻³ — a 23% underestimate. At 80% SOC where $\partial E_{oc}/\partial T = +2\times10^{-4}$ V K⁻¹, the entropic term reverses and reduces total heat by 46%. This is not a small correction.

---

## Assumptions

The derivation uses: (1) closed system, no mass crosses the boundary; (2) only electrical work crosses, no shaft or magnetic work; (3) all current is Faradaic — no double-layer charging or side reactions; (4) condensed-phase approximation $\Delta U_{rxn} \approx \Delta H_{rxn}$; (5) steady state $dT/dt = 0$ (the transient generalisation is $\dot{Q}_{gen} = mC_p\,dT/dt + \dot{Q}_{out}$); (6) bulk SOC for $E_{oc}$ — the P2D model uses surface concentration instead; (7) uniform temperature and heat generation across $V_b$.

---

## References

1. D. M. Bernardi, E. Pawlikowski, J. Newman, "A General Energy Balance for Battery Systems," *J. Electrochem. Soc.*, 132(1), 5–12, 1985. DOI: 10.1149/1.2113792.

2. V. V. Viswanathan et al., "Effect of entropy change of lithium intercalation in cathodes and anodes on Li-ion battery thermal management," *J. Power Sources*, 195(11), 3720–3729, 2010. DOI: 10.1016/j.jpowsour.2009.12.034.

3. A. Jokar et al., "Evaluation of accuracy for Bernardi equation in estimating heat generation rate for continuous and pulse-discharge protocols," *Appl. Therm. Eng.*, 201, 117794, 2022. DOI: 10.1016/j.applthermaleng.2021.117794.

4. G. L. Plett, *Battery Management Systems, Vol. 1: Battery Modeling*, Artech House, 2015.

5. J. Newman, K. E. Thomas-Alyea, *Electrochemical Systems*, 3rd ed., Wiley, 2004.
