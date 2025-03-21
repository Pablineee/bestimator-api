'use strict';

const { v4: uuid } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Job Types
      await queryInterface.bulkInsert({ schema: 'bestimator', tableName: 'JobTypes' }, [
        { job_type: 'Painting' },
        { job_type: 'Flooring' },
        { job_type: 'Drywall' },
      ]);

      const paintingJobType = 1;
      const flooringJobType = 2;
      const drywallJobType = 3;

      // Units
      await queryInterface.bulkInsert({ schema: 'bestimator', tableName: 'Units' }, [
        { unit_name: 'Each' },
        { unit_name: 'Pack' },
        { unit_name: 'Roll' },
        { unit_name: 'Square Foot' },
        { unit_name: 'Litre' },
        { unit_name: 'Gallon' },
        { unit_name: 'Box' },
        { unit_name: 'Foot' },
        { unit_name: 'Inch' },
      ]);

      const squareFootUnit = 4;
      const packUnit = 2;
      const rollUnit = 3;
      const footUnit = 8;
      const inchUnit = 9;
      const eachUnit = 7;

      // Province Weights (Currently only Canadian provinces)
      await queryInterface.bulkInsert({ schema: 'bestimator', tableName: 'ProvinceWeights' }, [
        { province: 'ON', province_weight: 1.00, province_tax_rate: 0.13 },
        { province: 'QC', province_weight: 0.87, province_tax_rate: 0.15 },
        { province: 'NS', province_weight: 1.01, province_tax_rate: 0.15 },
        { province: 'NB', province_weight: 1.01, province_tax_rate: 0.15 },
        { province: 'MB', province_weight: 0.89, province_tax_rate: 0.12 },
        { province: 'BC', province_weight: 0.89, province_tax_rate: 0.12 },
        { province: 'PE', province_weight: 1.00, province_tax_rate: 0.15 },
        { province: 'SK', province_weight: 0.94, province_tax_rate: 0.11 },
        { province: 'AB', province_weight: 0.88, province_tax_rate: 0.05 },
        { province: 'NL', province_weight: 1.10, province_tax_rate: 0.15 }
      ]);

      try {
        // Materials (Default)
        await queryInterface.bulkInsert({ schema: 'bestimator', tableName: 'Materials' }, [
          {
            material_id: uuid(),
            product_id: '1001838068',
            name: 'BEHR PREMIUM PLUS Interior Eggshell Enamel Paint & Primer, 3.79L',
            product_title: 'Interior Eggshell Enamel Paint & Primer, 3.79L',
            job_type_id: paintingJobType,
            price: 45.97,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001838068.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001838068.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001838068.jpg?product-images=l'
            ]),
            rating: 0,
            product_url:
              'https://www.homedepot.ca/product/behr-premium-plus-interior-eggshell-enamel-paint-primer-in-natural-white-dc-005-3-79l/1001838068',
            coverage: 400,
          },
          {
            material_id: uuid(),
            product_id: '1001838452',
            name: 'BEHR PREMIUM PLUS Interior Satin Enamel Paint & Primer, 3.79L',
            product_title: 'Interior Satin Enamel Paint & Primer, 3.79L',
            job_type_id: paintingJobType,
            price: 49.47,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001838452.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001838452.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001838452.jpg?product-images=l'
            ]),
            rating: 0,
            product_url:
              'https://www.homedepot.ca/product/behr-premium-plus-interior-satin-enamel-paint-primer-in-midtown-mq2-47-3-79l/1001838452',
            coverage: 400,
          },
          {
            material_id: uuid(),
            product_id: '1001838551',
            name: 'BEHR PREMIUM PLUS Interior Semi-Gloss Enamel Paint & Primer, 3.79L',
            product_title: 'Interior Semi-Gloss Enamel Paint & Primer, 3.79L',
            job_type_id: paintingJobType,
            price: 51.47,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001838551.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001838551.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001838551.jpg?product-images=l'
            ]),
            rating: 0,
            product_url:
              'https://www.homedepot.ca/product/behr-premium-plus-interior-semi-gloss-enamel-paint-primer-in-cotton-knit-ppu7-11-3-79l/1001838551',
            coverage: 400,
          },
          {
            material_id: uuid(),
            product_id: '1001495806',
            name: 'KILZ 1 STANDARD Interior Primer, 3.79L',
            product_title: '1 STANDARD Interior Primer, 3.79L',
            job_type_id: paintingJobType,
            price: 24.77,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001495806.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001495806.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001495806.jpg?product-images=l'
            ]),
            rating: 4.55,
            product_url:
              'https://www.homedepot.ca/product/kilz-1-standard-interior-primer-3-79l/1001495806',
            coverage: 375,
          },
          {
            material_id: uuid(),
            product_id: '1000123338',
            name: 'Zinsser BIN Shellac-Based Ultimate Performance Primer Sealer & Stain Killer, 946mL',
            product_title: 'BIN Shellac-Based Ultimate Performance Primer Sealer & Stain Killer, 946mL',
            job_type_id: paintingJobType,
            price: 41.97,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000123338.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000123338.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000123338.jpg?product-images=l'
            ]),
            rating: 4.63,
            product_url:
              'https://www.homedepot.ca/product/zinsser-bin-shellac-based-ultimate-performance-primer-sealer-stain-killer-946ml/1000123338',
            coverage: 100,
          },
          {
            material_id: uuid(),
            product_id: '1000854333',
            name: 'BENNETT 3 Pack 9.5 inch Ultimate Woven Rollers, 15MM',
            product_title: '3 Pack 9.5 inch Ultimate Woven Rollers, 15MM',
            job_type_id: paintingJobType,
            price: 18.47,
            unit_id: packUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000854333.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000854333.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000854333.jpg?product-images=l'
            ]),
            rating: 2.88,
            product_url:
              'https://www.homedepot.ca/product/bennett-3-pack-9-5-inch-ultimate-woven-rollers-15mm/1000854333',
            coverage: null,
          },
          {
            material_id: uuid(),
            product_id: '1000453104',
            name: 'Wooster 2 in. Shortcut Polyester Angle Sash Brush',
            product_title: '2 in. Shortcut Polyester Angle Sash Brush',
            job_type_id: paintingJobType,
            price: 10.32,
            unit_id: eachUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000453104.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000453104.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000453104.jpg?product-images=l'
            ]),
            rating: 4.78,
            product_url:
              'https://www.homedepot.ca/product/wooster-2-in-shortcut-polyester-angle-sash-brush/1000453104',
            coverage: null,
          },
          {
            material_id: uuid(),
            product_id: '1001890774',
            name: "Painter's Mate Ultra 0.94 inch x 60 yd. Painter's Tape in Green (6 - Pack)",
            product_title: "0.94 inch x 60 yd. Painter's Tape in Green (6 - Pack)",
            job_type_id: paintingJobType,
            price: 17.97,
            unit_id: rollUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001890774.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001890774.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001890774.jpg?product-images=l'
            ]),
            rating: 17.97,
            product_url:
              'https://www.homedepot.ca/product/painter-s-mate-ultra-0-94-inch-x-60-yd-painter-s-tape-in-green-6-pack-/1001890774',
            coverage: null,
          },
          {
            material_id: uuid(),
            product_id: '1001710242',
            name: 'Everbilt 6 ft. x 9 ft. Canvas Multi Purpose Drop Cloth',
            product_title: '6 ft. x 9 ft. Canvas Multi Purpose Drop Cloth',
            job_type_id: paintingJobType,
            price: 13.98,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001710242.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001710242.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001710242.jpg?product-images=l'
            ]),
            rating: 4.55,
            product_url:
              'https://www.homedepot.ca/product/everbilt-6-ft-x-9-ft-canvas-multi-purpose-drop-cloth/1001710242',
            coverage: 54,
          },
          {
            material_id: uuid(),
            product_id: '1000120476',
            name: 'Pintar 2L Plastic Paint Tray',
            product_title: '2L Plastic Paint Tray',
            job_type_id: paintingJobType,
            price: 6.97,
            unit_id: eachUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000120476.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000120476.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000120476.jpg?product-images=l'
            ]),
            rating: 4.46,
            product_url:
              'https://www.homedepot.ca/product/pintar-2l-plastic-paint-tray/1000120476',
            coverage: null,
          },
          {
            material_id: uuid(),
            product_id: '1001681705',
            name: 'GUOYA Birch Smooth 3/8-inch x 5-inch x Varying Length Engineered Hardwood Flooring (29.53 sq.ft./case)',
            product_title: 'Birch Smooth 3/8-inch x 5-inch x Varying Length Engineered Hardwood Flooring (29.53 sq.ft./case)',
            job_type_id: flooringJobType,
            price: 126.39,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001681705.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001681705.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001681705.jpg?product-images=l'
            ]),
            rating: 0,
            product_url:
              'https://www.homedepot.ca/product/guoya-birch-smooth-3-8-inch-x-5-inch-x-varying-length-engineered-hardwood-flooring-29-53-sq-ft-case-/1001681705',
            coverage: 29.53,
          },
          {
            material_id: uuid(),
            product_id: '1001862311',
            name: 'Lifeproof Oceanside Oak 10mm x 7.6 in. W x 54.45 in L Beige & Tan Wood Look Laminate Flooring (20.11 sq.ft./case)',
            product_title: 'Oceanside Oak 10mm x 7.6 in. W x 54.45 in L Beige & Tan Wood Look Laminate Flooring (20.11 sq.ft./case)',
            job_type_id: flooringJobType,
            price: 39.87,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001862311.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001862311.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001862311.jpg?product-images=l'
            ]),
            rating: 4.0,
            product_url:
              'https://www.homedepot.ca/product/lifeproof-oceanside-oak-10mm-x-7-6-in-w-x-54-45-in-l-beige-tan-wood-look-laminate-flooring-20-11-sq-ft-case-/1001862311',
            coverage: 20.11,
          },
          {
            material_id: uuid(),
            product_id: '1001776884',
            name: 'MSI Stone ULC Ibis Oak 6 MIL x 6-inch W x 36-inch L Waterproof Luxury Vinyl Plank Flooring (23.95 sq. ft. / case)',
            product_title: 'Ibis Oak 6 MIL x 6-inch W x 36-inch L Waterproof Luxury Vinyl Plank Flooring (23.95 sq. ft. / case)',
            job_type_id: flooringJobType,
            price: 39.27,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001776884.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001776884.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001776884.jpg?product-images=l'
            ]),
            rating: 3.12,
            product_url:
              'https://www.homedepot.ca/product/msi-stone-ulc-ibis-oak-6-mil-x-6-inch-w-x-36-inch-l-waterproof-luxury-vinyl-plank-flooring-23-95-sq-ft-case-/1001776884',
            coverage: 23.95,
          },
          {
            material_id: uuid(),
            product_id: '1000478079',
            name: 'Roberts 3300 3.78 L High Performance Multipurpose Carpet and Felt Back Sheet Vinyl Flooring Adhesive',
            product_title: '3300 3.78 L High Performance Multipurpose Carpet and Felt Back Sheet Vinyl Flooring Adhesive',
            job_type_id: flooringJobType,
            price: 32.98,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000478079.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000478079.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000478079.jpg?product-images=l'
            ]),
            rating: 5.0,
            product_url:
              'https://www.homedepot.ca/product/roberts-3300-3-78-l-high-performance-multipurpose-carpet-and-felt-back-sheet-vinyl-flooring-adhesive/1000478079',
            coverage: 180,
          },
          {
            material_id: uuid(),
            product_id: '1001518102',
            name: 'TrafficMaster Standard 100 sq. ft. Rolls 25 ft. x 4 ft. x .080 inch Polyethylene Foam 2-n-1 Underlayment',
            product_title: 'Standard 100 sq. ft. Rolls 25 ft. x 4 ft. x .080 inch Polyethylene Foam 2-n-1 Underlayment',
            job_type_id: flooringJobType,
            price: 38.98,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001518102.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001518102.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001518102.jpg?product-images=l'
            ]),
            rating: 4.3,
            product_url:
              'https://www.homedepot.ca/product/trafficmaster-standard-100-sq-ft-rolls-25-ft-x-4-ft-x-080-inch-polyethylene-foam-2-n-1-underlayment/1001518102',
            coverage: 100,
          },
          {
            material_id: uuid(),
            product_id: '1000518567',
            name: 'Alexandria Moulding (10-Pack) 5/8-inch x 2 1/2-inch x 84-inch Colonial MDF Primed Fibreboard Casing ValuPAK',
            product_title: '(10-Pack) 5/8-inch x 2 1/2-inch x 84-inch Colonial MDF Primed Fibreboard Casing ValuPAK',
            job_type_id: flooringJobType,
            price: 47.98,
            unit_id: footUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000518567.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000518567.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000518567.jpg?product-images=l'
            ]),
            rating: 4.37,
            product_url:
              'https://www.homedepot.ca/product/alexandria-moulding--10-pack-5-8-inch-x-2-1-2-inch-x-84-inch-colonial-mdf-primed-fibreboard-casing-valupak/1000518567',
            coverage: 70,
          },
          {
            material_id: uuid(),
            product_id: '1000160838',
            name: 'Alexandria Moulding 11/16-inch x 11/16-inch x 8 ft. Primed Finger Jointed Pine Quarter Round',
            product_title: '11/16-inch x 11/16-inch x 8 ft. Primed Finger Jointed Pine Quarter Round',
            job_type_id: flooringJobType,
            price: 5.98,
            unit_id: footUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000160838.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000160838.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000160838.jpg?product-images=l'
            ]),
            rating: 4.44,
            product_url:
              'https://www.homedepot.ca/product/alexandria-moulding-11-16-inch-x-11-16-inch-x-8-ft-primed-finger-jointed-pine-quarter-round/1000160838',
            coverage: 8,
          },
          {
            material_id: uuid(),
            product_id: '1001883767',
            name: 'Zamma Adapt A Trim 3-in-1 Vinyl Reducer & Transition Molding Color 3691 1.85-inchx.35-inchx72-inch',
            product_title: 'Adapt A Trim 3-in-1 Vinyl Reducer & Transition Molding Color 3691 1.85-inchx.35-inchx72-inch',
            job_type_id: flooringJobType,
            price: 44.98,
            unit_id: inchUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001883767.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001883767.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001883767.jpg?product-images=l'
            ]),
            rating: 0,
            product_url:
              'https://www.homedepot.ca/product/zamma-adapt-a-trim-3-in-1-vinyl-reducer-transition-molding-color-3691-1-85-inchx-35-inchx72-inch/1001883767',
            coverage: 72,
          },
          {
            material_id: uuid(),
            product_id: '1000686028',
            name: 'CGC Sheetrock 1/2 in. x 4 ft. x 8 ft. UltraLight Drywall Panel',
            product_title: '1/2 in. x 4 ft. x 8 ft. UltraLight Drywall Panel',
            job_type_id: drywallJobType,
            price: 9.2,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000686028.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000686028.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000686028.jpg?product-images=l'
            ]),
            rating: 4.48,
            product_url:
              'https://www.homedepot.ca/product/cgc-sheetrock-1-2-in-x-4-ft-x-8-ft-ultralight-drywall-panel/1000686028',
            coverage: 32,
          },
          {
            material_id: uuid(),
            product_id: '1000113381',
            name: 'CGC Sheetrock All Purpose Drywall Compound, Ready-Mixed, 2L Pail',
            product_title: 'All Purpose Drywall Compound, Ready-Mixed, 2L Pail',
            job_type_id: drywallJobType,
            price: 14.50,
            unit_id: squareFootUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000113381.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000113381.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000113381.jpg?product-images=l'
            ]),
            rating: 4.62,
            product_url:
              'https://www.homedepot.ca/product/cgc-sheetrock-all-purpose-drywall-compound-ready-mixed-2l-pail/1000113381',
            coverage: 120,
          },
          {
            material_id: uuid(),
            product_id: '1000117375',
            name: 'CGC Sheetrock Drywall Paper Joint Tape, 2-1/16 in x 500 Ft. Roll',
            product_title: 'Drywall Paper Joint Tape, 2-1/16 in x 500 Ft. Roll',
            job_type_id: drywallJobType,
            price: 9.2,
            unit_id: footUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000117375.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000117375.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000117375.jpg?product-images=l'
            ]),
            rating: 4.56,
            product_url:
              'https://www.homedepot.ca/product/cgc-sheetrock-drywall-paper-joint-tape-2-1-16-in-x-500-ft-roll/1000117375',
            coverage: 500,
          },
          {
            material_id: uuid(),
            product_id: '1000435640',
            name: 'Bailey Metal Products 1.25-inch x 8 ft. D100 90 Drywall Metal Corner Bead Trim',
            product_title: '1.25-inch x 8 ft. D100 90 Drywall Metal Corner Bead Trim',
            job_type_id: drywallJobType,
            price: 3.94,
            unit_id: footUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1000435640.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1000435640.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1000435640.jpg?product-images=l'
            ]),
            rating: 4.43,
            product_url:
              'https://www.homedepot.ca/product/bailey-metal-products-1-25-inch-x-8-ft-d100-90-drywall-metal-corner-bead-trim/1000435640',
            coverage: 8,
          },
          {
            material_id: uuid(),
            product_id: '1001746640',
            name: 'Diablo Dual-Edge 220-Grit Sanding Sponge',
            product_title: 'Dual-Edge 220-Grit Sanding Sponge',
            job_type_id: drywallJobType,
            price: 5.88,
            unit_id: eachUnit,
            image_url: JSON.stringify([
              'https://images.homedepot.ca/productimages/p_1001746640.jpg?product-images=s',
              'https://images.homedepot.ca/productimages/p_1001746640.jpg?product-images=m',
              'https://images.homedepot.ca/productimages/p_1001746640.jpg?product-images=l'
            ]),
            rating: 4.77,
            product_url:
              'https://www.homedepot.ca/product/diablo-dual-edge-220-grit-sanding-sponge/1001746640',
            coverage: null,
          }
        ]);
      } catch(error){
        throw new Error(`Failed to insert materials: ${error.message}`);
      }
      
      await transaction.commit();
    } catch(err){
      await transaction.rollback();
      throw new Error(`An error occurred: ${err.message}`);
    }
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ schema: 'bestimator', tableName: 'Materials' }, null);
    await queryInterface.bulkDelete({ schema: 'bestimator', tableName: 'ProvinceWeights' }, null);
    await queryInterface.bulkDelete({ schema: 'bestimator', tableName: 'Units' }, null);
    await queryInterface.bulkDelete({ schema: 'bestimator', tableName: 'JobTypes' }, null);
  }
};
