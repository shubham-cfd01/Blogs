---
title: 'Deriving the Bernardi Heat Generation Equation from First Principles'
date: 2026-05-10
description: Derivation of the Bernardi (1985) battery heat generation equation — from the First Law through Faraday's Law, the Nernst equation, and the Maxwell relation — with every term defined and every assumption stated.
tags: [battery, thermal, modeling, thermodynamics]
published: true
---

The Bernardi equation (1985) gives the volumetric heat generation rate of a lithium-ion cell in terms of terminal measurements alone:

$$
q = \frac{I}{V_b}(E_{oc} - V_T) - \frac{I}{V_b}\,T\frac{\partial E_{oc}}{\partial T}
$$

| Symbol | Meaning | Units |
|---|---|---|
| $q$ | Volumetric heat generation rate | W m⁻³ |
| $I$ | Current, positive on discharge | A |
| $V_b$ | Cell volume | m³ |
| $E_{oc}$ | Open-circuit voltage at current SOC and $T$ | V |
| $V_T$ | Terminal voltage under load | V |
| $T$ | Cell temperature | K |
| $\partial E_{oc}/\partial T$ | Entropic coefficient at fixed SOC | V K⁻¹ |

The derivation needs two ingredients: an energy balance (where does chemical energy go?), and a thermodynamic identity (what is the reaction enthalpy in electrical terms?). Both are derived below.

---

## Energy balance

Define the system as the entire cell. Two quantities cross the boundary: electrical work $V_T I$ leaves through the load, and heat $\dot{Q}_{in}$ exchanges with the environment. All matter stays inside. The First Law in rate form:

$$
\frac{dU_{sys}}{dt} = \dot{Q}_{in} - V_T I \tag{1}
$$

The internal energy splits as $U_{sys} = U_{chem} + U_{therm}$. To evaluate $dU_{chem}/dt$, we need the reaction rate — moles of lithium transferred per second.

**Faraday's Law.** Four symbols:

- $N_A = 6.022\times10^{23}$ mol⁻¹ — Avogadro's number
- $e = 1.602\times10^{-19}$ C — charge on one electron
- $n$ — electrons released per formula unit; $\text{Li} \to \text{Li}^+ + e^-$ gives $n = 1$ for all Li-ion chemistries
- $N_{Li}$ — moles of lithium transferred so far (variable)

The Faraday constant is the charge carried by one mole of electrons: $F = N_A e = 96\,485$ C mol⁻¹. Total charge passed equals electrons per Li atom times charge per mole times moles transferred: $Q = n F N_{Li}$. Differentiating with respect to time ($dQ/dt = I$):

$$
\dot{N}_{Li} = \frac{I}{nF} \tag{2}
$$

Each mole of lithium transferred changes chemical energy by $\Delta H_{rxn}$. For solid/liquid phases $P\Delta V \approx 0$, so $\Delta U_{rxn} \approx \Delta H_{rxn}$. Defining $\dot{H}_{rxn} \equiv -\dot{N}_{Li}\,\Delta H_{rxn} = -(I/nF)\,\Delta H_{rxn} > 0$ (positive because discharge is exothermic):

$$
\frac{dU_{chem}}{dt} = -\dot{H}_{rxn} \tag{3}
$$

At steady state ($dT/dt = 0$), $dU_{therm}/dt = 0$, so $dU_{sys}/dt = -\dot{H}_{rxn}$. Substituting into Eq. 1 and writing $\dot{Q}_{gen} = -\dot{Q}_{in}$:

$$
\dot{Q}_{gen} = \dot{H}_{rxn} - V_T I \tag{4}
$$

Heat generated equals enthalpy released minus work extracted. $\dot{H}_{rxn}$ is still unknown — the next section expresses it in measurable form.

---

## Reaction enthalpy from electrical measurements

**Nernst equation.** The Clausius inequality bounds the maximum non-PV work at constant $T$ and $P$:

$$
W'_{max} = -\Delta G_{rxn} \tag{5}
$$

Per mole of reaction, $n$ moles of electrons pass through the open-circuit voltage $E_{oc}$, so $W'_{max} = nFE_{oc}$. Equating:

$$
E_{oc} = \frac{-\Delta G_{rxn}}{nF} \tag{6}
$$

OCV in volts is Gibbs energy per coulomb of charge transferred.

**Entropic coefficient.** From $G = H - TS$, the Gibbs relation gives $(\partial G/\partial T)_P = -S$. Applied to the reaction: $(\partial \Delta G_{rxn}/\partial T)_P = -\Delta S_{rxn}$. Substituting Eq. 6:

$$
\frac{\partial E_{oc}}{\partial T} = \frac{\Delta S_{rxn}}{nF} \tag{7}
$$

The slope of OCV with temperature at fixed SOC is a direct measure of $\Delta S_{rxn}$.

### Why $\partial E_{oc}/\partial T$ changes sign with SOC

![Entropic coefficient vs SOC for NMC811/graphite (LG M50). Top: individual electrode contributions. Bottom: full-cell dEoc/dT. Data from O'Regan et al. (2022).](/images/entropic-coefficient-soc.svg)

The full cell: $\partial E_{oc}/\partial T = dU_{+}/dT - dU_{-}/dT$ (cathode minus anode). For NMC811/graphite (LG M50, measured by O'Regan et al., 2022):

Graphite intercalates lithium in ordered **staging phases**: in Stage $n$, Li occupies every $n$-th graphene layer. Stage 4 (few Li, $x < 0.12$) → Stage 3 → Stage 2 ($x \approx 0.25$–$0.5$) → Stage 1 ($x > 0.5$, fully every layer filled). Each stage is a distinct crystal structure with its own configurational entropy.

- **0–47% SOC** — graphite is in Stage 4 or transitioning to Stage 3. Li atoms have many equivalent inter-layer sites → high configurational entropy. Removing Li during discharge collapses this disorder sharply → $dU_{-}/dT \gg 0$ → full-cell $\partial E_{oc}/\partial T < 0$ → extra heat beyond Joule heating.
- **47–100% SOC** — graphite is in Stage 2 / Stage 1, both well-ordered single-phase structures. Anode entropy contribution shrinks; NMC cathode (solid-solution, no staging) slightly dominates → $\partial E_{oc}/\partial T > 0$ → cell absorbs heat, reducing net $q$.

The sign change near 47% SOC is a single crossing for this chemistry. NMC811 contributes a small, smooth offset throughout.

**Enthalpy.** From $\Delta G_{rxn} = \Delta H_{rxn} - T\,\Delta S_{rxn}$, substitute Eq. 6 and Eq. 7:

$$
\Delta H_{rxn} = -nFE_{oc} + T \cdot nF\frac{\partial E_{oc}}{\partial T}
$$

Multiply by $-\dot{N}_{Li} = -I/nF$ (Eq. 2); $nF$ cancels:

$$
\dot{H}_{rxn} = I\!\left[E_{oc} - T\frac{\partial E_{oc}}{\partial T}\right] \tag{8}
$$

---

## The Bernardi equation

Write $\dot{Q}_{gen} = q\,V_b$. Substitute Eq. 8 into Eq. 4 and divide by $V_b$:

$$
q = \underbrace{\frac{I}{V_b}(E_{oc} - V_T)}_{q_{irr}} \;-\; \underbrace{\frac{I}{V_b}\,T\frac{\partial E_{oc}}{\partial T}}_{q_{rev}} \tag{9}
$$

**$q_{irr}$** scales as $I^2$ (since $E_{oc} - V_T \approx IR_{int}$). It is always non-negative — every ohmic, charge-transfer, and concentration loss converts energy to heat irreversibly.

**$q_{rev}$** scales linearly with $I$ and changes sign with SOC through $\partial E_{oc}/\partial T$. It is not a dissipation — it is the thermodynamically required heat exchange $T\,\Delta S_{rxn}$ per mole of reaction (the Clausius equality in the reversible limit). A cell with zero resistance still has it. At low C-rates it dominates the quadratic $q_{irr}$; Viswanathan et al. (2010) measured it at 20–40% of total heat at C/5 and below.

---

## Numerical example

**18650 NMC/graphite, 1C (3 A), 50% SOC, 298 K:**

$$
q_{irr} = \frac{3}{16.5\times10^{-6}} \times (3.85 - 3.72) = 23\,636\;\text{W m}^{-3}
$$

$$
q_{rev} = -\frac{3}{16.5\times10^{-6}} \times 298 \times (-1.0\times10^{-4}) = +5\,418\;\text{W m}^{-3}
$$

$$
q = 29\,054\;\text{W m}^{-3}
$$

The Joule-only model ($q \approx I^2 R_{int}/V_b$) gives 23 636 W m⁻³ — a 23% underestimate at this SOC. At 80% SOC where $\partial E_{oc}/\partial T = +2\times10^{-4}$ V K⁻¹, $q_{rev}$ reverses sign and the total falls to 12 800 W m⁻³.

---

## References

1. D. M. Bernardi, E. Pawlikowski, J. Newman, "A General Energy Balance for Battery Systems," *J. Electrochem. Soc.*, 132(1), 5–12, 1985. DOI: 10.1149/1.2113792.
2. V. V. Viswanathan et al., "Effect of entropy change of lithium intercalation in cathodes and anodes on Li-ion battery thermal management," *J. Power Sources*, 195(11), 3720–3729, 2010. DOI: 10.1016/j.jpowsour.2009.12.034.
3. A. Jokar et al., "Evaluation of accuracy for Bernardi equation under pulse-discharge protocols," *Appl. Therm. Eng.*, 201, 117794, 2022. DOI: 10.1016/j.applthermaleng.2021.117794.
4. K. O'Regan, F. Brosa Planella, W. D. Widanage, E. Kendrick, "Thermal-electrochemical parameters of a high energy lithium-ion cylindrical battery," *Electrochimica Acta*, 425, 140700, 2022. DOI: 10.1016/j.electacta.2022.140700. — Source of the measured entropic coefficient fits used in the plot above.
5. G. L. Plett, *Battery Management Systems, Vol. 1*, Artech House, 2015.
6. J. Newman, K. E. Thomas-Alyea, *Electrochemical Systems*, 3rd ed., Wiley, 2004.
