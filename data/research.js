// =====================================================================
//  RESEARCH  (Research 페이지 + Home의 연구 카드)
//  - projects 안의 image 는 img/research/ 폴더의 그림이에요.
//  - refs 는 관련 논문/과제예요. link 가 없으면 "" 로 두세요.
// =====================================================================

window.RESEARCH = [
  {
    id: "energy",
    title: "Energy Systems",
    image: "banners/research-energy.jpg",
    homeTitle: "AI-driven Design and Optimization of Energy Systems",
    homeTags: "Next-generation Battery Systems · Energy Harvesting Devices · Structural Optimization",
    cardText: "Batteries & energy harvesting",
    overview: [
      "The development of next-generation energy technologies is essential for building a sustainable future, supporting advances from electric mobility to renewable energy storage. As the demand for efficient, safe, and scalable energy solutions grows, new battery systems and energy harvesting systems are gaining attention.",
      "At SONG Research Group, we advance energy systems through AI-powered modeling, multiscale simulation, and optimization-driven design. Our research covers:"
    ],
    bullets: [
      "Potassium-ion batteries (K-ion batteries) for cost-effective, resource-abundant storage.",
      "Sodium-ion batteries (Na-ion batteries) for cost-effective, resource-abundant storage.",
      "All-solid-state batteries (ASSBs) with enhanced safety and high energy density.",
      "Energy harvesting systems that convert ambient energy into usable electrical power for self-sustaining devices."
    ],
    closing: [
      "By combining computational engineering with physical insights, we aim to accelerate the design and deployment of advanced storage and harvesting technologies.",
      "Through simulation, AI, and next-generation materials engineering, SONG's Lab is shaping the future of intelligent, sustainable energy systems."
    ],
    projects: [
      {
        title: "DFT-Driven Multiscale & Multiphysics Design for Potassium-Ion Batteries (PIBs)",
        image: "research/energy-1.jpg",
        text: [
          "Potassium-ion batteries (PIBs) are a promising alternative to lithium-ion batteries, due to the high abundance and low cost of potassium. Despite these advantages, PIBs face challenges such as large ion size and significant volume expansion, which can degrade battery performance.",
          "Our group addresses these issues through DFT-driven multiscale modeling, combining quantum-level calculations with 3D particle simulations. This approach helps us understand ion transport, stress evolution, and overall battery behavior across scales, leading to more reliable and efficient PIB designs."
        ],
        refs: [
          {
            label: "Related publication",
            title: "Advanced multiscale modeling of potassium-ion batteries for interplay of electrochemical and mechanical behavior across scales",
            venue: "Small Structures (IF 13.9), 2025",
            link: "https://onlinelibrary.wiley.com/doi/10.1002/sstr.202400640"
          }
        ]
      },
      {
        title: "Design and Characterization of Magnetic Cores for Energy Harvesting",
        image: "research/energy-2.jpg",
        text: [
          "Magnetic energy harvesters coupled to power lines enable energy capture from ambient electromagnetic fields, offering a sustainable power source for low-power sensing applications. Their performance depends heavily on the B-H characteristics of the magnetic core under realistic excitation conditions.",
          "Our group develops a modeling framework to extract accurate B-H curves by analyzing the effects of core geometry and flux density in power-line environments. This foundation will be extended with machine learning and optimization methods to enable intelligent, simulation-based design of magnetic harvesters for varied operating scenarios."
        ],
        refs: [
          {
            label: "Related research",
            title: "B-H curve estimation and air gap optimization for high-performance split core",
            venue: "Materials (IF 3.1), 2025",
            link: "https://www.mdpi.com/1996-1944/18/3/644"
          }
        ]
      },
      {
        title: "Microstructure Optimization for All-Solid-State Batteries (ASSBs) Design",
        image: "research/energy-3.jpg",
        text: [
          "All-solid-state batteries (ASSBs) are emerging as next-generation energy storage systems due to their high energy density and enhanced safety features. Unlike liquid-based batteries, lithium ions in ASSBs migrate through contact areas between solid particles, making microstructural characteristics a critical factor in battery performance.",
          "Our group investigates how internal microstructures, such as particle size and volume fraction, influence ion transport and electrochemical behavior. Using a combination of microstructure modeling and physics-based simulations, we analyze particle-to-particle contact areas and their impact on performance. We further develop an electrochemical model that explicitly incorporates contact area effects."
        ],
        refs: [
          {
            label: "Related publication",
            title: "From microstructure to performance through coupled electrochemical and mechanical insights in all-solid-state batteries",
            venue: "Journal of Energy Storage (IF 10.7), 2026",
            link: "https://doi.org/10.1016/j.est.2026.124264"
          }
        ]
      }
    ]
  },
  {
    id: "nanobio",
    title: "Nano-Bio Systems",
    image: "banners/research-nanobio.jpg",
    homeTitle: "AI-driven Design and Optimization for Nano-Bio Systems",
    homeTags: "Drug Delivery Systems · Biosensors · Organ-on-a-Chip Platforms",
    cardText: "Biosensors, organ-on-a-chip & drug delivery",
    overview: [
      "Advances in Nano-Bio systems are driving breakthroughs in diagnostics, therapeutics, and personalized medicine. As the need for precise, miniaturized, and intelligent biomedical technologies grows, innovation at the intersection of nanotechnology, biology, and computational engineering becomes critical.",
      "At SONG Research Group, we design Nano-Bio systems through AI-powered modeling, multiscale simulation, and physics-informed optimization. Our research includes:"
    ],
    bullets: [
      "Plasmonic biosensors and biomedical devices for real-time, ultra-sensitive biomolecular detection.",
      "Organ-on-a-Chip platforms that replicate biological environments for drug development.",
      "Targeted drug delivery systems to enhance efficacy and minimize side effects."
    ],
    closing: [
      "By combining computational engineering, machine learning, and nanobiotechnology, we aim to create platforms that translate fundamental science into real-world impact.",
      "SONG group is committed to advancing the next generation of smart, scalable biomedical systems."
    ],
    projects: [
      {
        title: "Multiscale & Multiphysics Design for Point-of-Care Diagnostic Devices",
        image: "research/nanobio-1.jpg",
        text: [
          "Point-of-Care (POC) diagnostic platforms are essential for rapid, accessible healthcare, especially in resource-limited settings. Designing these devices requires understanding complex interactions between fluid flow, biomolecule transport, and sensor response at multiple scales.",
          "Our group develops a multiscale and multiphysics design framework for optimizing POC systems. We integrate wave optics, heat transfer, microfluidics, and particle tracing modeling to predict device performance under real-world conditions. This approach enables the development of compact, low-power, and highly sensitive diagnostic devices, paving the way for reliable, field-deployable healthcare solutions."
        ],
        refs: [
          {
            label: "Related publication",
            title: "Nanoplasmonic Rapid Antimicrobial-resistance Point-of-care Identification Device: RAPIDx",
            venue: "Advanced Healthcare Materials (IF 10.0), 2024 · Inside Back Cover",
            link: "https://doi.org/10.1002/adhm.202402044"
          }
        ]
      },
      {
        title: "Multiscale & Multiphysics Design for Plasmonic Biosensors",
        image: "research/nanobio-2.jpg",
        text: [
          "Plasmonic biosensors provide high sensitivity for biomolecular detection by exploiting localized surface plasmon resonance (LSPR) in nanostructured metallic materials. To optimize their performance, it is essential to understand the interplay between electromagnetic fields, molecular interactions, and device geometry.",
          "Our group develops a multiscale and multiphysics simulation framework that combines electromagnetic analysis with molecular-scale transport and reaction modeling. This approach enables the precise tuning of nanostructure shape, gap distance, and surface chemistry to enhance signal strength and sensing specificity in realistic biological environments."
        ],
        refs: [
          {
            label: "Related publication",
            title: "High-spatial and colourimetric imaging of histone modifications in single senescent cells using plasmonic nanoprobes",
            venue: "Nature Communications (IF 17.7), 2021",
            link: "https://www.nature.com/articles/s41467-021-26224-9"
          }
        ]
      },
      {
        title: "3D Cell Culture & Microfluidic Mixing Systems",
        image: "research/nanobio-3.jpg",
        text: [
          "Three-dimensional (3D) spheroid cultures offer enhanced physiological relevance compared to conventional 2D models, making them well-suited for studying tissue behavior, drug response, and cell–cell interactions. Our group develops platforms for controlled and reproducible spheroid formation, enabling scalable and long-term in vitro modeling of complex biological systems.",
          "Separately, we design microfluidic mixing systems optimized for efficient and homogeneous mixing of reagents under continuous flow. By tuning channel geometries and flow conditions, these systems support precise biochemical stimulation and real-time control of reaction environments in lab-on-a-chip applications."
        ],
        refs: [
          {
            label: "Related publication",
            title: "Adjustable and versatile 3D tumor spheroid culture platform with interfacial elastomeric wells",
            venue: "ACS Applied Materials & Interfaces (IF 10.4), 2020",
            link: "https://doi.org/10.1021/acsami.9b21471"
          },
          {
            label: "Related publication",
            title: "Characterization of passive microfluidic mixer with a three-dimensional zig-zag channel for cryo-EM sampling",
            venue: "Chemical Engineering Science (IF 4.7), 2023",
            link: "https://doi.org/10.1016/j.ces.2023.119161"
          }
        ]
      }
    ]
  },
  {
    id: "intelligent",
    title: "Intelligent Systems Engineering",
    image: "banners/research-intelligent.jpg",
    homeTitle: "Multiscale Simulation and Machine Learning Integration",
    homeTags: "FEM · PFM · DFT · Data-Driven Multiscale Modeling",
    cardText: "PINNs, deep learning & Bayesian optimization",
    overview: [
      "Artificial intelligence is reshaping engineering by enabling smarter, faster, and more efficient design, optimization, and deployment across fields from energy systems to biomedical platforms. As real-world applications grow increasingly complex, AI-driven approaches open new pathways for innovation.",
      "At SONG Research Group, we integrate AI and computational techniques to advance simulation, modeling, and optimization processes. Our research focuses on:"
    ],
    bullets: [
      "Deep learning-based optimization for complex system and device design.",
      "Physics-informed neural networks (PINNs) to enhance simulation accuracy and efficiency.",
      "Data-driven multiscale modeling linking physical insights with computational methods.",
      "Bayesian optimization and reinforcement learning for adaptive, real-time design improvements."
    ],
    closing: [
      "By merging physical principles with AI, we aim to accelerate innovation across energy, bio-mechanical, and multiscale systems.",
      "SONG group is committed to developing intelligent, data-driven engineering solutions for next-generation technologies."
    ],
    projects: [
      {
        title: "PINN-based Multiscale & Multiphysics Design for Sodium-Ion Batteries (SIBs)",
        image: "research/intelligent-1.jpg",
        text: [
          "Sodium-ion batteries (SIBs) are gaining attention as a sustainable alternative to lithium-based systems, thanks to sodium's high abundance and low cost. However, achieving high performance and stability remains a key challenge.",
          "Our group develops a Physics-Informed Neural Network (PINN)-based multiscale design framework to optimize SIBs. We integrate DFT-based material data, neural networks, and multiphysics simulations to capture stress, heat, and ion transport across scales. This enables efficient battery design under real-world constraints, such as temperature and mechanical stress."
        ],
        refs: [
          {
            label: "Related research",
            title: "Physics-Informed Neural Network (PINN)-based multiscale and multiphysics design system for Sodium-ion batteries",
            venue: "Mid-career Research Grant from NRF of Korea, 2025–2029",
            link: ""
          }
        ]
      },
      {
        title: "AI-Driven Design of Biochip Platforms",
        image: "research/intelligent-2.jpg",
        text: [
          "Our group applies artificial intelligence to design and optimize biochip systems for biomedical applications, for example exosome separation and 3D spheroid culture.",
          "In the exosome separation platform, we combine multiphysics simulation and Bayesian optimization to refine microfluidic chamber and outlet geometries. This approach enables precise control over flow conditions and particle behavior, significantly improving exosome separation efficiency and yield.",
          "In parallel, we apply deep learning models to the design of 3D spheroid culture chips for organ-on-a-chip applications. Through multiphysics simulation-based data generation and neural network training, we develop predictive tools that relate device geometry to key biological outcomes, such as spheroid formation, nutrient flow, and drug response. This approach allows rapid evaluation and fine-tuning of chip designs for high-performance drug screening platforms.",
          "By integrating simulation and machine learning, we provide a data-driven framework for rapidly developing customized biochips suited for diagnostics, drug screening, and personalized therapy research."
        ],
        refs: []
      },
      {
        title: "AI-Driven Design Framework for Next-Generation Vaccine Systems",
        image: "research/intelligent-3.jpg",
        text: [
          "Next-generation mRNA vaccines require both efficient delivery systems and rational antigen design to achieve high efficacy and stability. Our group develops AI-assisted frameworks to address both challenges through data-driven optimization and molecular modeling.",
          "To guide the formulation of lipid nanoparticles (LNPs) for mRNA delivery, we integrate microfluidic mixing data with predictive machine learning models. This enables rapid exploration of formulation parameters and mixing conditions to enhance encapsulation efficiency and particle uniformity.",
          "In parallel, we apply generative AI and molecular simulation techniques to design and screen novel antigen sequences. By coupling large-scale sequence generation with structural stability and binding energy analysis, we identify optimized candidates with improved immunogenic potential.",
          "Together, these approaches support an intelligent, simulation-guided pipeline for the development of mRNA-based vaccine systems."
        ],
        refs: []
      }
    ]
  }
];
