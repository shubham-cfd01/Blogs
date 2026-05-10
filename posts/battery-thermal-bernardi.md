---
title: 'Deriving the Bernardi Heat Generation Equation from First Principles'
date: 2026-05-10
description: Derivation of the Bernardi (1985) battery heat generation equation — from the First Law through Faraday's Law, the Nernst equation, and the Maxwell relation — with every term defined and every assumption stated.
tags: [battery, thermal, modeling, thermodynamics]
published: true
---

Before 1985, battery thermal models used Joule heating: $\dot{Q} \approx I^2 R_{int}$. The formula is simple, quadratic in current, and always positive — reassuringly tidy. It is also wrong by 20–50% at low C-rates, and wrong in the wrong direction at some states of charge, where the cell partially cools the environment rather than heating it.

The error comes from ignoring the entropy of the electrochemical reaction. Bernardi, Pawlikowski, and Newman (1985) fixed this by applying the First Law rigorously to the cell and expressing every quantity in measurable terminal variables. The result is:

$$
q = \frac{I}{V_b}(E_{oc} - V_T) - \frac{I}{V_b}\,T\frac{\partial E_{oc}}{\partial T}
$$

where $q$ is the volumetric heat generation rate (W m⁻³), $I$ is current (A, positive during discharge), $V_b$ is the cell volume (m³), $E_{oc}$ is the open-circuit voltage (V), $V_T$ is the terminal voltage under load (V), $T$ is temperature (K), and $\partial E_{oc}/\partial T$ is the slope of OCV with temperature at fixed state of charge (V K⁻¹). Everything is measurable at the terminals; no internal probes are needed.

The derivation has two threads. The first is an energy balance that determines where the chemical energy goes. The second is a thermodynamic argument that expresses the enthalpy of reaction in electrical terms. They converge at the equation above.

---

## The system and its energy

Fix the boundary at the cell surface: anode, separator, cathode, electrolyte, and casing all inside. Two things cross this boundary — electrons carry electrical work out through the load, and heat exchanges with the thermal environment. All atoms and ions stay inside.

The internal energy of the cell is:

$$
U_{sys} = U_{chem} + U_{therm}
$$

$U_{chem}$ is the energy stored in the lithium intercalation state — the free energy difference between lithium sitting in graphite and lithium sitting in the cathode lattice. It decreases during discharge as lithium moves from high to low chemical potential. $U_{therm}$ is the vibrational kinetic energy of all atoms — what temperature measures. A resistor has only $U_{therm}$; a battery has both, and conflating them is the source of the $I^2 R$ error.

The First Law in rate form, with $\dot{Q}_{in}$ as heat flowing into the cell and $V_T I$ as electrical work leaving:

$$
\frac{dU_{sys}}{dt} = \dot{Q}_{in} - V_T I \tag{1}
$$

$\dot{Q}_{in}$ is negative during normal discharge — the cell is warmer than the environment, so heat flows out. The sign feels backwards until you work through the algebra, at which point it cancels correctly.

---

## Connecting current to reaction rate

To evaluate $dU_{sys}/dt$ we need the rate at which lithium transfers between electrodes — how many moles per second. That rate is determined entirely by the electric current.

The Faraday constant is not an empirical number. One mole of electrons carries:

$$
F = N_A \cdot e = 6.022\times10^{23} \times 1.602\times10^{-19} = 96\,485\;\text{C mol}^{-1}
$$

For the intercalation reaction $\text{Li} \to \text{Li}^+ + e^-$, exactly one electron transfers per lithium atom, so $n = 1$ for all lithium-ion chemistries. Faraday's Law of Electrolysis (1834) states that the total charge $Q$ passed is $Q = n F N$, where $N$ is moles of lithium transferred. Differentiating:

$$
\dot{n} = \frac{I}{nF} \tag{2}
$$

At 3 A this gives $\dot{n} = 3/96\,485 \approx 31$ micromoles of lithium per second.

---

## The energy balance master equation

Each mole of lithium transferred changes the cell's chemical energy by $\Delta H_{rxn}$ (J mol⁻¹). For solid and liquid phases — the electrodes and electrolyte — volume changes during intercalation are less than 0.1% volumetric, so $P\Delta V \approx 0$ and internal energy and enthalpy are interchangeable: $\Delta U_{rxn} \approx \Delta H_{rxn}$. Combining with Eq. 2 and defining $\dot{H}_{rxn} \equiv -(I/nF)\,\Delta H_{rxn} > 0$ (positive because discharge is exothermic, $\Delta H_{rxn} < 0$):

$$
\frac{dU_{chem}}{dt} = -\dot{H}_{rxn} \tag{3}
$$

At steady state — the cell has reached a stable operating temperature, so $dT/dt = 0$ and $dU_{therm}/dt = 0$ — the internal energy change is purely chemical: $dU_{sys}/dt = -\dot{H}_{rxn}$. Substituting into Eq. 1 and writing $\dot{Q}_{gen} = -\dot{Q}_{in}$ (heat generated, always positive):

$$
\dot{Q}_{gen} = \dot{H}_{rxn} - V_T I \tag{4}
$$

Heat generated equals total enthalpy released by the reaction minus electrical work extracted to the load. A quick check: for an 18650 NMC cell at 2 A with $E_{oc} = 3.80$ V and $V_T = 3.65$ V, the gap $(E_{oc} - V_T) \times I = 0.15 \times 2 = 0.30$ W is the heat generated — the energy the cell tried to deliver but couldn't because of internal losses.

Eq. 4 is the master equation. The problem is that $\dot{H}_{rxn}$ is not directly measurable. The next step expresses it in terms of OCV and its temperature slope.

---

## Voltage is Gibbs energy per coulomb

When lithium moves from the high-potential anode to the low-potential cathode, it releases chemical free energy. At zero current — open circuit — no energy is lost to resistance or kinetics, so the cell voltage is a direct thermodynamic measure of the Gibbs free energy change of the reaction.

Formally, the Clausius inequality limits the maximum non-PV work a reaction can deliver at constant temperature and pressure:

$$
W'_{max} = -\Delta G_{rxn} \tag{5}
$$

For spontaneous discharge $\Delta G_{rxn} < 0$, so $W'_{max} > 0$. Per mole of reaction, $n$ moles of electrons pass through voltage $E_{oc}$, carrying charge $Q_{mol} = nF$ coulombs per mole. The maximum electrical work per mole is charge times voltage: $W'_{max} = nFE_{oc}$. Equating with Eq. 5:

$$
E_{oc} = \frac{-\Delta G_{rxn}}{nF} \tag{6}
$$

Units: $\text{J mol}^{-1}/(\text{C mol}^{-1}) = \text{J C}^{-1} = \text{V}$. A volt is a joule per coulomb; OCV in volts is Gibbs energy per coulomb of charge transferred.

The OCV curve you measure by sweeping slowly through SOC is this equation traced continuously as the ratio of product to reactant activities changes with lithium stoichiometry. The 59 mV/decade rule follows from the Nernst equation: $E_{oc} = E^0 - (RT/nF)\ln Q_r$, where the thermal voltage $RT/nF = 25.69$ mV at 25 °C and a tenfold change in concentration ratio shifts OCV by $25.69 \times \ln 10 = 59.2$ mV.

---

## The OCV slope measures reaction entropy

Since $G = H - TS$, the Gibbs free energy depends on temperature. The exact thermodynamic identity at constant pressure:

$$
\left(\frac{\partial G}{\partial T}\right)_P = -S
$$

Applied to the reaction, $(\partial \Delta G_{rxn}/\partial T)_P = -\Delta S_{rxn}$. Substituting Eq. 6:

$$
\frac{\partial E_{oc}}{\partial T} = \frac{\Delta S_{rxn}}{nF} \tag{7}
$$

The slope of OCV versus temperature at fixed SOC is a direct measure of the reaction entropy. Measuring it requires only a voltmeter and a thermostat: charge to the target SOC, rest until equilibrium, record OCV at two temperatures, divide $\Delta E_{oc}$ by $\Delta T$. No calorimetry. The sign is chemistry- and SOC-dependent — for graphite/NMC it changes sign two or three times across the SOC range.

---

## Enthalpy from electrical measurements alone

From $\Delta G_{rxn} = \Delta H_{rxn} - T\,\Delta S_{rxn}$, substitute Eq. 6 ($\Delta G_{rxn} = -nFE_{oc}$) and Eq. 7 ($\Delta S_{rxn} = nF\,\partial E_{oc}/\partial T$):

$$
\Delta H_{rxn} = -nFE_{oc} + T \cdot nF\frac{\partial E_{oc}}{\partial T}
$$

Multiply by $-I/nF$ (the molar flow rate from Eq. 2) to convert to a power:

$$
\dot{H}_{rxn} = I\!\left[E_{oc} - T\frac{\partial E_{oc}}{\partial T}\right] \tag{8}
$$

$nF$ cancels, and every quantity on the right is electrically measurable: current from an ammeter, OCV from a voltmeter after the cell has rested, temperature from a thermocouple, and the entropic coefficient from potentiometry at two temperatures.

---

## The Bernardi equation

Write $\dot{Q}_{gen} = q \cdot V_b$ to express heat generation per unit volume. Substitute Eq. 8 into the master equation (Eq. 4) and divide by $V_b$:

$$
q \cdot V_b = I\!\left[E_{oc} - T\frac{\partial E_{oc}}{\partial T}\right] - V_T I
$$

Expanding and collecting:

$$
q = \underbrace{\frac{I}{V_b}(E_{oc} - V_T)}_{q_{irr}} \;-\; \underbrace{\frac{I}{V_b}\,T\frac{\partial E_{oc}}{\partial T}}_{q_{rev}} \tag{9}
$$

---

## Two heat sources, two characters

**Irreversible heat $q_{irr}$** comes from the total overpotential $(E_{oc} - V_T)$ — the voltage the cell failed to deliver because of ohmic resistance, charge-transfer activation energy at the electrode-electrolyte interface, and concentration polarisation as lithium depletes near the electrode surface. Since $(E_{oc} - V_T) \approx IR_{int}$, this term scales as $I^2$. It is always non-negative: a cell cannot have a terminal voltage above its open-circuit voltage during discharge.

**Reversible heat $q_{rev}$** is not a dissipation. It is the heat the reaction must exchange with the environment to satisfy the Second Law, equal to $T\,\Delta S_{rxn}$ per mole of reaction (the reversible heat from the Clausius equality). A cell with zero internal resistance still has it. It scales linearly with $I$, so at low C-rates it dominates the quadratic $q_{irr}$, and its sign follows $\partial E_{oc}/\partial T$:

| $\partial E_{oc}/\partial T$ | Physical meaning | Effect on heating |
|---|---|---|
| positive | Intercalation is endothermic at this SOC | $q_{rev} < 0$ — cell absorbs heat, net heating reduced |
| negative | Intercalation is exothermic at this SOC | $q_{rev} > 0$ — cell generates heat beyond Joule heating |

Viswanathan et al. (2010) measured this effect across several chemistries and found $q_{rev}$ is 20–40% of total heat at C/5 and below. For graphite/NMC the entropic coefficient changes sign two to three times across SOC, so the same cell heats and partially cools at different points in a discharge cycle.

---

## A worked example

**18650 NMC/graphite cell, 1C discharge (3 A), 50% SOC:**

| Quantity | Value |
|---|---|
| $E_{oc}$ | 3.85 V |
| $V_T$ | 3.72 V |
| $T$ | 298 K |
| $\partial E_{oc}/\partial T$ | $-1.0\times10^{-4}$ V K⁻¹ |
| $V_b$ | $16.5\times10^{-6}$ m³ |

$$
q_{irr} = \frac{3}{16.5\times10^{-6}} \times (3.85 - 3.72) = 23\,636\;\text{W m}^{-3}
$$

$$
q_{rev} = -\frac{3}{16.5\times10^{-6}} \times 298 \times (-1.0\times10^{-4}) = +5\,418\;\text{W m}^{-3}
$$

$$
q = 29\,054\;\text{W m}^{-3}
$$

The Joule-only model gives 23 636 W m⁻³ — a 23% underestimate. At 80% SOC where $\partial E_{oc}/\partial T = +2\times10^{-4}$ V K⁻¹, the entropic term reverses sign and the total drops to 12 800 W m⁻³ — 46% lower than Joule heating alone. This is not a correction; it is the dominant effect at those conditions.

---

## Assumptions and validity

The derivation assumes: the cell is a closed system (no mass flux across the boundary); the only work interaction is electrical (no shaft work); all current drives the intercalation reaction (no double-layer charging current or parasitic side reactions); electrode volume changes are negligible so $\Delta U_{rxn} \approx \Delta H_{rxn}$; the cell is at steady state (for the transient case, $\dot{Q}_{gen} = mC_p\,dT/dt + \dot{Q}_{out}$); and temperature and heat generation are spatially uniform throughout $V_b$.

The most consequential limitation in practice is the bulk-SOC assumption: $E_{oc}$ and $\partial E_{oc}/\partial T$ are evaluated at the bulk state of charge rather than at the electrode surface. Under pulse discharge and drive-cycle loading, local surface SOC differs significantly from bulk, and Jokar et al. (2022) showed this causes systematic overestimation of heat generation. The P2D model avoids this by using surface concentration $c_{s,surf}$ directly.

---

## References

1. D. M. Bernardi, E. Pawlikowski, J. Newman, "A General Energy Balance for Battery Systems," *J. Electrochem. Soc.*, 132(1), 5–12, 1985. DOI: 10.1149/1.2113792.

2. V. V. Viswanathan et al., "Effect of entropy change of lithium intercalation in cathodes and anodes on Li-ion battery thermal management," *J. Power Sources*, 195(11), 3720–3729, 2010. DOI: 10.1016/j.jpowsour.2009.12.034.

3. A. Jokar et al., "Evaluation of accuracy for Bernardi equation in estimating heat generation rate for continuous and pulse-discharge protocols in LFP and NMC based Li-ion batteries," *Appl. Therm. Eng.*, 201, 117794, 2022. DOI: 10.1016/j.applthermaleng.2021.117794.

4. G. L. Plett, *Battery Management Systems, Vol. 1: Battery Modeling*, Artech House, 2015.

5. J. Newman, K. E. Thomas-Alyea, *Electrochemical Systems*, 3rd ed., Wiley, 2004.
