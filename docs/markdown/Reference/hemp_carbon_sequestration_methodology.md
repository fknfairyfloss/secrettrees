# Hemp Carbon Sequestration Methodology and Verification Process

## 1. Introduction

This document provides a comprehensive methodology for measuring, verifying, and certifying carbon sequestration in hemp-based construction materials used in the Secret Trees project. The methodology addresses both the carbon sequestered during hemp cultivation and the carbon stored long-term in hempcrete building materials, with clear distinctions between dry and wet biomass measurements.

The approach is designed to align with international carbon accounting standards while addressing the specific characteristics of hemp as a construction material. This methodology will serve as the foundation for creating verifiable carbon credits that can be tokenized through Ricardian contracts, providing a transparent and auditable record of carbon sequestration.

## 2. Scientific Foundation

### 2.1 Hemp Carbon Sequestration Principles

Hemp (Cannabis sativa L.) is recognized as an efficient carbon sequestration crop due to several key characteristics:

1. **Rapid Growth Rate**: Hemp can grow 4 meters in 100 days, rapidly accumulating biomass
2. **High Carbon Content**: Approximately 40% of hemp dry biomass is carbon
3. **Deep Root System**: Hemp roots sequester additional carbon in soil (up to 1.5 meters deep)
4. **Low Input Requirements**: Minimal fertilizer and pesticide needs reduce carbon footprint
5. **Multiple Carbon Pools**: Carbon is stored in both the plant material and soil

When hemp is used in construction (hempcrete), the sequestered carbon is locked into the building material for the lifetime of the structure, creating long-term carbon storage.

### 2.2 Carbon Accounting Fundamentals

The methodology follows these carbon accounting principles:

1. **Completeness**: Accounting for all significant carbon pools and fluxes
2. **Consistency**: Using consistent methodologies over time
3. **Transparency**: Clear documentation of all assumptions and methods
4. **Accuracy**: Minimizing bias and uncertainty in measurements
5. **Conservativeness**: Using conservative estimates when uncertainty exists

### 2.3 Dry vs. Wet Biomass Distinction

A critical distinction in hemp carbon calculations is between wet (fresh) and dry biomass:

**Wet Biomass**: The total mass of freshly harvested hemp plants, including water content
- Typically contains 50-70% moisture depending on harvest conditions
- Not suitable for direct carbon calculations due to variable water content
- Must be converted to dry biomass for accurate carbon accounting

**Dry Biomass**: The mass of hemp material after removing water content
- Obtained by drying samples to constant weight (typically at 105°C)
- Provides the basis for accurate carbon content calculations
- Standard scientific measure for carbon sequestration calculations

**Conversion Formula**:
Dry Biomass (kg) = Wet Biomass (kg) × (1 - Moisture Content (%)/100)

All carbon sequestration calculations in this methodology are based on dry biomass to ensure scientific accuracy and consistency.

## 3. Carbon Sequestration Measurement Methodology

### 3.1 Hemp Cultivation Carbon Sequestration

#### 3.1.1 Aboveground Biomass Measurement

1. **Field Sampling Protocol**:
   - Establish minimum 3 random sampling plots (1m²) per hectare
   - Harvest all plants within sampling plots
   - Record fresh (wet) weight immediately after harvest
   - Take subsamples for moisture content determination
   - Dry subsamples at 105°C to constant weight
   - Calculate dry biomass yield using moisture content conversion

2. **Carbon Content Determination**:
   - Laboratory analysis of carbon content using dry combustion method
   - Default value: 40% carbon content of dry biomass (if lab testing unavailable)
   - Apply conservative factor of 0.95 to account for potential variations

3. **Aboveground Carbon Calculation**:
   ```
   Aboveground Carbon (kg C/ha) = Dry Biomass Yield (kg/ha) × Carbon Content (%) × 0.95
   ```

#### 3.1.2 Belowground Biomass Measurement

1. **Root Biomass Estimation**:
   - Use root-to-shoot ratio method (non-destructive)
   - Default hemp root-to-shoot ratio: 0.22 (conservative estimate)
   - Apply conservative factor of 0.9 to account for uncertainty

2. **Belowground Carbon Calculation**:
   ```
   Belowground Carbon (kg C/ha) = Aboveground Carbon (kg C/ha) × Root-to-Shoot Ratio × 0.9
   ```

#### 3.1.3 Soil Organic Carbon Changes

1. **Soil Sampling Protocol**:
   - Establish baseline soil organic carbon (SOC) before hemp cultivation
   - Minimum 5 sampling points per hectare
   - Sample at depths: 0-15cm, 15-30cm, 30-60cm, 60-100cm
   - Analyze using dry combustion method or loss-on-ignition with calibration
   - Repeat sampling after harvest using same locations and methods

2. **SOC Change Calculation**:
   ```
   SOC Change (kg C/ha) = [Post-harvest SOC (kg C/ha) - Baseline SOC (kg C/ha)] × Conservative Factor (0.7)
   ```
   - Conservative factor accounts for uncertainty and potential reversibility

#### 3.1.4 Emissions Deductions

1. **Cultivation Emissions Accounting**:
   - Document all inputs: fuel, fertilizer, pesticides, seeds, machinery
   - Calculate emissions using standard emission factors
   - Include transportation to processing facility

2. **Net Cultivation Carbon Calculation**:
   ```
   Net Cultivation Carbon (kg C/ha) = (Aboveground Carbon + Belowground Carbon + SOC Change) - Cultivation Emissions
   ```

### 3.2 Hempcrete Building Material Carbon Sequestration

#### 3.2.1 Hemp Hurd Processing Carbon Accounting

1. **Processing Yield Determination**:
   - Measure dry hemp straw input (kg)
   - Measure dry hemp hurd output (kg)
   - Calculate processing yield ratio
   - Document processing energy inputs and calculate emissions

2. **Processing Carbon Balance**:
   ```
   Processing Carbon Balance (kg C) = Carbon in Hemp Hurd - Processing Emissions
   ```

#### 3.2.2 Hempcrete Mixture Carbon Content

1. **Hempcrete Composition Documentation**:
   - Hemp hurd content (kg/m³)
   - Binder content and type (kg/m³)
   - Water content (kg/m³)
   - Additives if any (kg/m³)

2. **Binder Emissions Calculation**:
   - Calculate CO₂ emissions from binder production
   - For lime binder: account for carbonation carbon reabsorption
   - For hydraulic lime: use appropriate emission factors

3. **Net Hempcrete Carbon Calculation**:
   ```
   Net Hempcrete Carbon (kg C/m³) = Carbon in Hemp Hurd - Binder Emissions + Carbonation Reabsorption
   ```

#### 3.2.3 Building Implementation Measurement

1. **Material Quantity Documentation**:
   - Detailed records of hempcrete volume used (m³)
   - Wall thickness measurements (minimum 10 points per wall)
   - Density measurements (minimum 3 samples per batch)
   - Photographic documentation with measurement references

2. **Construction Emissions Accounting**:
   - Document energy use during construction
   - Calculate emissions from transportation and equipment
   - Include all additional materials and their embedded carbon

3. **Net Building Carbon Calculation**:
   ```
   Net Building Carbon (kg C) = (Net Hempcrete Carbon × Total Volume) - Construction Emissions
   ```

### 3.3 Total Carbon Sequestration Calculation

```
Total Carbon Sequestration (kg C) = Net Cultivation Carbon + Net Building Carbon
```

Convert to CO₂ equivalent:
```
Total CO₂ Sequestration (kg CO₂e) = Total Carbon Sequestration (kg C) × 3.67
```

## 4. Verification and Certification Process

### 4.1 Documentation Requirements

#### 4.1.1 Cultivation Documentation

- Field location and size (GPS coordinates and area measurement)
- Cultivation practices (planting date, harvest date, inputs)
- Yield measurements and calculations (with raw data)
- Laboratory analysis reports for carbon content
- Soil sampling methodology and results
- Input records (fertilizer, fuel, etc.)
- Photographic evidence with timestamps and geotags

#### 4.1.2 Processing Documentation

- Processing facility information
- Input and output weights with moisture content
- Processing methods and equipment
- Energy consumption records
- Quality control tests for construction-grade hemp
- Chain of custody documentation

#### 4.1.3 Construction Documentation

- Building plans and specifications
- Material quantity records
- Mixing formulations with batch records
- Construction methodology documentation
- Photographic and video evidence of implementation
- Testing results for finished hempcrete (density, thermal properties)
- Construction timeline and conditions

### 4.2 Third-Party Verification Protocol

#### 4.2.1 Verification Body Requirements

- Accreditation under ISO 14065 or equivalent
- Experience in agricultural and/or building carbon accounting
- Independence from project participants
- Technical expertise in hemp cultivation and construction

#### 4.2.2 Verification Process

1. **Document Review**:
   - Assessment of all documentation for completeness and consistency
   - Verification of calculation methodologies
   - Cross-checking of reported data against supporting evidence

2. **Site Inspection**:
   - Physical inspection of cultivation sites
   - Inspection of processing facilities
   - Inspection of constructed buildings
   - Sample collection for independent testing

3. **Data Validation**:
   - Recalculation of carbon sequestration using raw data
   - Comparison with standard benchmarks and expected values
   - Assessment of conservative factors and uncertainty management
   - Verification of emissions calculations and deductions

4. **Verification Report**:
   - Detailed findings and assessment
   - Identification of any non-conformities
   - Calculation of verified carbon sequestration
   - Recommendations for methodology improvements

### 4.3 Ongoing Monitoring and Verification

#### 4.3.1 Building Monitoring System

1. **Physical Monitoring**:
   - Moisture content sensors embedded in hempcrete walls
   - Structural integrity monitoring
   - Regular visual inspections (minimum annual)
   - Photographic documentation of condition

2. **Data Collection System**:
   - Automated sensor data collection where applicable
   - Secure data storage with tamper-evident features
   - Regular calibration and maintenance of monitoring equipment
   - Backup systems for critical measurements

#### 4.3.2 Verification Schedule

- Initial verification at construction completion
- Annual monitoring reports
- Full verification audit every 5 years
- Additional verification after any significant building modifications

### 4.4 Non-Permanence Risk Management

#### 4.4.1 Risk Assessment

- Building lifespan estimation (minimum 100 years for permanent structures)
- Structural integrity risk factors
- Fire and disaster risk assessment
- Maintenance and ownership risk factors

#### 4.4.2 Buffer Pool Allocation

- 15% of total carbon credits allocated to buffer pool
- Buffer pool managed collectively across all Secret Trees projects
- Credits released from buffer after 50 years of verified permanence

#### 4.4.3 Insurance and Legal Protections

- Building insurance requirements
- Legal covenants for building maintenance
- Contractual obligations for carbon permanence
- Liability provisions for premature carbon release

## 5. Carbon Credit Issuance and Tokenization

### 5.1 Credit Calculation Methodology

1. **Gross Carbon Sequestration**:
   - Total verified CO₂ sequestration from all measurement components

2. **Uncertainty Deduction**:
   - Apply uncertainty factor based on measurement precision
   - Minimum 10% uncertainty deduction

3. **Buffer Pool Allocation**:
   - 15% of remaining credits to non-permanence buffer pool

4. **Net Issuable Credits**:
   ```
   Net Issuable Credits = Gross Sequestration × (1 - Uncertainty Factor) × (1 - Buffer Pool Allocation)
   ```

### 5.2 Credit Vintage and Serialization

- Credits vintage based on construction completion date
- Unique serial numbers for each credit
- Batch identification linked to specific building sections
- Metadata including verification reports and documentation links

### 5.3 Ricardian Contract Structure

#### 5.3.1 Contract Components

1. **Physical Asset Reference**:
   - Building identification and location
   - Specific wall sections and material quantities
   - Construction date and methodology
   - Verification documentation references

2. **Carbon Quantification**:
   - Verified carbon sequestration amount
   - Calculation methodology reference
   - Uncertainty and buffer pool deductions
   - Net credit issuance amount

3. **Verification Evidence**:
   - Verification body identification
   - Verification date and protocol reference
   - Monitoring requirements and schedule
   - Non-permanence risk management provisions

4. **Legal Terms**:
   - Ownership and transfer rights
   - Liability provisions
   - Monitoring and verification obligations
   - Invalidation and replacement provisions

#### 5.3.2 Digital Representation

- Immutable record on selected blockchain
- Hash of all supporting documentation
- Cryptographic links to verification evidence
- Smart contract functionality for transfers and retirements

### 5.4 Tokenization Implementation

#### 5.4.1 Token Standard and Platform

- Utility token implementation (not security token)
- ERC-1155 or equivalent standard
- Energy-efficient blockchain selection
- Compatibility with carbon market registries

#### 5.4.2 Token Metadata

- Carbon credit vintage and serial numbers
- Verification body and date
- Project location and type
- Hemp variety and construction methodology
- Link to full Ricardian contract and documentation

#### 5.4.3 Token Functionality

- Transfer between wallets
- Retirement/cancellation for offsetting claims
- Fractionalization capabilities
- Batch operations for efficiency
- Integration with carbon marketplaces

## 6. Alignment with Carbon Standards and Registries

### 6.1 Voluntary Carbon Market Standards

#### 6.1.1 Verra (VCS) Alignment

- Methodology elements compatible with VCS requirements
- Adaptations needed for full compliance:
  - Additional leakage assessment
  - Expanded additionality demonstration
  - Modified monitoring requirements

#### 6.1.2 Gold Standard Alignment

- Methodology elements compatible with Gold Standard requirements
- Adaptations needed for full compliance:
  - Expanded sustainable development goals assessment
  - Additional stakeholder consultation documentation
  - Modified safeguards assessment

### 6.2 EU Regulatory Framework Alignment

#### 6.2.1 EU Carbon Farming Initiative

- Alignment with EU Carbon Farming Initiative principles
- Compatibility with emerging EU certification framework
- Adaptations for EU agricultural policy integration

#### 6.2.2 EU Taxonomy Alignment

- Climate change mitigation criteria alignment
- Do No Significant Harm (DNSH) assessment
- Technical screening criteria for sustainable construction

### 6.3 Registry Integration Pathway

- Initial independent registry with blockchain verification
- Pathway to integration with established carbon registries
- Dual registration options for market flexibility
- Conversion process between token and traditional credits

## 7. Implementation Guidelines

### 7.1 Measurement and Verification Timeline

#### 7.1.1 Pre-Construction Phase

- Baseline soil carbon measurement
- Hemp cultivation documentation setup
- Verification body engagement
- Monitoring system design

#### 7.1.2 Construction Phase

- Material testing and documentation
- Construction process documentation
- Sensor installation and calibration
- Initial data collection system setup

#### 7.1.3 Post-Construction Phase

- Complete verification process
- Credit calculation and issuance
- Tokenization implementation
- Ongoing monitoring initiation

### 7.2 Data Management System

#### 7.2.1 Data Collection Tools

- Field measurement applications and tools
- Laboratory testing protocols
- Construction documentation templates
- Sensor data collection systems

#### 7.2.2 Data Storage and Security

- Secure cloud-based storage
- Blockchain anchoring of critical data
- Backup and redundancy systems
- Access control and audit trails

#### 7.2.3 Reporting System

- Automated data compilation
- Standardized report generation
- Verification body access portal
- Public transparency dashboard

### 7.3 Quality Assurance and Quality Control

#### 7.3.1 Measurement QA/QC

- Equipment calibration protocols
- Duplicate sampling requirements
- Cross-checking procedures
- Independent laboratory verification

#### 7.3.2 Calculation QA/QC

- Independent recalculation requirements
- Consistency checks across projects
- Conservative factor application
- Uncertainty analysis and management

#### 7.3.3 Documentation QA/QC

- Document completeness checklist
- Cross-reference verification
- Timestamp and signature requirements
- Chain of custody documentation

## 8. Continuous Improvement Process

### 8.1 Methodology Review Schedule

- Annual internal methodology review
- Biennial external expert review
- Five-year comprehensive revision
- Ad hoc updates based on scientific developments

### 8.2 Feedback Integration Process

- Verification body feedback collection
- Scientific advisory panel input
- Project implementation learnings
- Market and regulatory development monitoring

### 8.3 Version Control and Documentation

- Formal version numbering system
- Change log maintenance
- Transition provisions for methodology updates
- Backward compatibility considerations

## 9. Appendices

### Appendix A: Calculation Worksheets

1. **Hemp Cultivation Carbon Calculation Worksheet**
   - Field data entry forms
   - Automated calculation formulas
   - Uncertainty analysis tools
   - Results summary templates

2. **Hempcrete Carbon Calculation Worksheet**
   - Material quantity documentation
   - Processing emissions calculations
   - Construction implementation data
   - Net sequestration results

3. **Credit Issuance Calculation Worksheet**
   - Gross sequestration compilation
   - Deduction calculations
   - Buffer pool allocation
   - Net credit determination

### Appendix B: Laboratory Testing Protocols

1. **Biomass Carbon Content Analysis**
   - Sample preparation procedures
   - Testing equipment specifications
   - Quality control requirements
   - Results interpretation guidelines

2. **Soil Carbon Analysis**
   - Sampling depth and location protocols
   - Sample handling and preservation
   - Analysis methods and equipment
   - Data reporting requirements

3. **Hempcrete Material Testing**
   - Density measurement protocol
   - Carbon content verification
   - Structural property testing
   - Moisture behavior assessment

### Appendix C: Monitoring System Specifications

1. **Sensor Types and Placement**
   - Moisture content sensors
   - Structural monitoring sensors
   - Environmental condition sensors
   - Data transmission systems

2. **Data Collection Protocols**
   - Measurement frequency
   - Data validation procedures
   - Calibration requirements
   - Maintenance schedule

3. **Alert and Intervention System**
   - Threshold parameters
   - Alert notification process
   - Intervention protocols
   - Documentation requirements

### Appendix D: Verification Report Template

1. **Project Information Section**
   - Project identification
   - Verification scope
   - Methodology version reference
   - Verification team composition

2. **Process Description Section**
   - Document review process
   - Site visit activities
   - Sampling approach
   - Calculation verification

3. **Findings Section**
   - Conformity assessment
   - Non-conformity documentation
   - Corrective action tracking
   - Uncertainty assessment

4. **Conclusion Section**
   - Verification statement
   - Verified carbon sequestration
   - Limitations and qualifications
   - Recommendations

## 10. Conclusion

This comprehensive methodology provides a scientifically rigorous, transparent, and conservative approach to measuring, verifying, and certifying carbon sequestration in hemp-based construction materials. By clearly distinguishing between wet and dry biomass measurements and addressing all aspects of the hemp value chain from cultivation to building implementation, the methodology creates a solid foundation for generating high-integrity carbon credits.

The integration with Ricardian contracts and tokenization creates a transparent and immutable record of carbon sequestration that can be tracked, traded, and verified throughout the life of the building. This approach aligns with emerging carbon market standards while pioneering new approaches to building-based carbon sequestration.

By implementing this methodology, Secret Trees will establish a credible system for quantifying and monetizing the climate benefits of hemp construction, creating additional value streams while contributing to climate change mitigation.
