---
title: 'Deriving the Bernardi Heat Generation Equation from First Principles'
date: 2026-05-10
description: Why Joule heating alone can be off by 20–40% — and how the First Law plus the Nernst equation give the complete picture in two measurable terms.
#tags: [battery, thermal, modeling, thermodynamics]
published: true
---

The Bernardi equation (1985) gives the volumetric heat generation rate of a lithium-ion cell in measurable quantities alone:

$$
q = \underbrace{\frac{I}{V_b}(E_{oc} - V_T)}_{q_{irr}} \;-\; \underbrace{\frac{I}{V_b}\,T\frac{\partial E_{oc}}{\partial T}}_{q_{rev}}
$$

| Symbol | Meaning | Units |
|---|---|---|
| $I$ | Current (positive on discharge) | A |
| $V_b$ | Cell volume | m³ |
| $E_{oc}$ | Open-circuit voltage at current SOC and $T$ | V |
| $V_T$ | Terminal voltage under load | V |
| $T$ | Cell temperature | K |
| $\partial E_{oc}/\partial T$ | Entropic coefficient at fixed SOC | V K⁻¹ |

---

## Energy balance

Define the system as the entire cell. Two quantities cross the boundary: electrical work $V_T I$ leaves through the load; heat $\dot{Q}_{in}$ exchanges with the environment. All matter stays inside. The First Law in rate form:

$$
\frac{dU_{sys}}{dt} = \dot{Q}_{in} - V_T I \tag{1}
$$

The internal energy splits as $U_{sys} = U_{chem} + U_{therm}$. Evaluating $dU_{chem}/dt$ requires the reaction rate — moles of lithium transferred per second — which is set by the current.

**Faraday's Law.** Define:
- $N_A = 6.022\times10^{23}$ mol⁻¹ — Avogadro's number
- $e = 1.602\times10^{-19}$ C — charge per electron → Faraday constant $F = N_A e = 96\,485$ C mol⁻¹
- $n = 1$ — electrons per Li atom ($\text{Li} \to \text{Li}^+ + e^-$, one electron per formula unit for all Li-ion)
- $N_{Li}$ — moles of Li transferred (variable)

Total charge: $Q = nFN_{Li}$. Differentiating ($dQ/dt = I$):

$$
\dot{N}_{Li} = \frac{I}{nF} \tag{2}
$$

Each mole transferred changes chemical energy by $\Delta H_{rxn}$ (using $\Delta U_{rxn} \approx \Delta H_{rxn}$ since $P\Delta V \approx 0$ for solid/liquid electrodes). Defining $\dot{H}_{rxn} \equiv -(I/nF)\,\Delta H_{rxn} > 0$ (positive because discharge is exothermic, $\Delta H_{rxn} < 0$):

$$
\frac{dU_{chem}}{dt} = -\dot{H}_{rxn} \tag{3}
$$

At steady state ($dT/dt = 0$), $dU_{therm}/dt = 0$, so $dU_{sys}/dt = -\dot{H}_{rxn}$. Substitute into Eq. 1 and define $\dot{Q}_{gen} = -\dot{Q}_{in}$:

$$
\boxed{\dot{Q}_{gen} = \dot{H}_{rxn} - V_T I} \tag{4}
$$

Heat generated = enthalpy released by reaction − electrical work extracted. $\dot{H}_{rxn}$ is still unknown. The next section expresses it in measurable electrical terms.

---

## $\dot{H}_{rxn}$ in measurable form

**Nernst.** The Clausius inequality gives $W'_{max} = -\Delta G_{rxn}$. Per mole, $n$ electrons flow through $E_{oc}$, so $W'_{max} = nFE_{oc}$. Equating:

$$
E_{oc} = \frac{-\Delta G_{rxn}}{nF} \tag{5}
$$

OCV is Gibbs energy per coulomb — voltage is thermodynamics in electrical units.

**Entropic coefficient.** The Gibbs relation $(\partial G/\partial T)_P = -S$ applied to the reaction gives $(\partial\Delta G_{rxn}/\partial T)_P = -\Delta S_{rxn}$. Substituting Eq. 5:

$$
\frac{\partial E_{oc}}{\partial T} = \frac{\Delta S_{rxn}}{nF} \tag{6}
$$

The OCV slope with temperature at fixed SOC directly measures $\Delta S_{rxn}$ — no calorimetry needed.

**Enthalpy.** Substitute Eq. 5 and Eq. 6 into $\Delta G_{rxn} = \Delta H_{rxn} - T\Delta S_{rxn}$, then multiply by $-\dot{N}_{Li} = -I/nF$ (Eq. 2); $nF$ cancels:

$$
\boxed{\dot{H}_{rxn} = I\!\left[E_{oc} - T\frac{\partial E_{oc}}{\partial T}\right]} \tag{7}
$$

All quantities on the right are directly measurable.

---

## The Bernardi equation

Write $\dot{Q}_{gen} = q\,V_b$. Substitute Eq. 7 into Eq. 4 and divide by $V_b$:

$$
\boxed{q = \frac{I}{V_b}(E_{oc} - V_T) - \frac{I}{V_b}\,T\frac{\partial E_{oc}}{\partial T}} \tag{9}
$$

**$q_{irr} = \frac{I}{V_b}(E_{oc}-V_T)$** — the overpotential gap $(E_{oc}-V_T)$ is all the voltage lost inside: ohmic resistance, charge-transfer activation, concentration polarisation. Since $E_{oc}-V_T \approx IR_{int}$, this scales as $I^2$. Always $\geq 0$.

**$q_{rev} = -\frac{I}{V_b}T\frac{\partial E_{oc}}{\partial T}$** — not a dissipation loss. It is the thermodynamically required heat exchange $T\,\Delta S_{rxn}$ per mole (the Clausius reversible heat). A cell with zero resistance still has it. It scales as $I^1$, so at low C-rates it dominates the quadratic $q_{irr}$. Its sign depends on SOC — the same cell can cool the environment at one SOC and heat it at another. Viswanathan et al. (2010) measured $q_{rev}$ at 20–40% of total heat at C/5 and below.

### Why $\partial E_{oc}/\partial T$ changes sign with SOC

![Entropic coefficient vs SOC for NMC811/graphite (LG M50). Top: electrode half-cell contributions. Bottom: full-cell dEoc/dT. Data: O'Regan et al. (2022).](/images/entropic-coefficient-soc.svg)

Full cell: $\partial E_{oc}/\partial T = dU_+/dT - dU_-/dT$. The graphite anode dominates because it intercalates lithium in ordered **staging phases** — in Stage $n$, Li occupies every $n$-th graphene layer (Stage 4: dilute, $x < 0.12$; Stage 3; Stage 2: $x \approx 0.25$–$0.5$; Stage 1: dense, $x > 0.5$). Each stage has a distinct configurational entropy.

- **0–47% SOC** — graphite is in Stage 4/3 (dilute, disordered). Removing Li collapses disorder sharply → $dU_-/dT \gg 0$ → $\partial E_{oc}/\partial T < 0$ → $q_{rev} > 0$ (extra heat).
- **47–100% SOC** — graphite enters Stage 2/1 (ordered, single-phase). Anode entropy contribution shrinks; NMC cathode (solid-solution, no staging) slightly dominates → $\partial E_{oc}/\partial T > 0$ → $q_{rev} < 0$ (cell absorbs heat).

---

## Numerical example

**18650 NMC/graphite, 1C, 50% SOC, 298 K** ($I=3$ A, $V_b=16.5\times10^{-6}$ m³, $E_{oc}=3.85$ V, $V_T=3.72$ V, $\partial E_{oc}/\partial T = -1.0\times10^{-4}$ V K⁻¹):

$$
q_{irr} = \frac{3}{16.5\times10^{-6}}\times 0.13 = 23\,636\;\text{W m}^{-3}
$$

$$
q_{rev} = -\frac{3}{16.5\times10^{-6}}\times 298\times(-1.0\times10^{-4}) = +5\,418\;\text{W m}^{-3}
$$

$$
q = 29\,054\;\text{W m}^{-3}
$$

The Joule-only model ($I^2R_{int}/V_b$) gives 23 636 W m⁻³ — a **23% underestimate**.

---

## References

1. D. M. Bernardi, E. Pawlikowski, J. Newman, "A General Energy Balance for Battery Systems," *J. Electrochem. Soc.*, 132(1), 5–12, 1985. DOI: 10.1149/1.2113792.
2. V. V. Viswanathan et al., "Effect of entropy change of lithium intercalation in cathodes and anodes on Li-ion battery thermal management," *J. Power Sources*, 195(11), 3720–3729, 2010. DOI: 10.1016/j.jpowsour.2009.12.034.
3. K. O'Regan, F. Brosa Planella, W. D. Widanage, E. Kendrick, "Thermal-electrochemical parameters of a high energy lithium-ion cylindrical battery," *Electrochimica Acta*, 425, 140700, 2022. DOI: 10.1016/j.electacta.2022.140700.
4. A. Jokar et al., "Evaluation of accuracy for Bernardi equation under pulse-discharge protocols," *Appl. Therm. Eng.*, 201, 117794, 2022. DOI: 10.1016/j.applthermaleng.2021.117794.
5. G. L. Plett, *Battery Management Systems, Vol. 1*, Artech House, 2015.
6. J. Newman, K. E. Thomas-Alyea, *Electrochemical Systems*, 3rd ed., Wiley, 2004.
