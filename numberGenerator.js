let canvas = `<svg viewBox="0 0 154 62" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="p01" d="M27 -1.31134e-07L30 3L27 6L7 6L4 3L7.00001 -1.00536e-06L27 -1.31134e-07Z" fill="white" fill-opacity="0.05"/>
<path id="p02" d="M0 7L3 4L6 7V27L3 30L0 27V7Z" fill="white" fill-opacity="0.05"/>
<path id="p03" d="M28 7L31 4L34 7V27L31 30L28 27V7Z" fill="white" fill-opacity="0.05"/>
<path id="p04" d="M27 28L30 31L27 34L7 34L4 31L7.00001 28L27 28Z" fill="white" fill-opacity="0.05"/>
<path id="p05" d="M0 35L3 32L6 35V55L3 58L0 55V35Z" fill="white" fill-opacity="0.05"/>
<path id="p06" d="M28 35L31 32L34 35V55L31 58L28 55V35Z" fill="white" fill-opacity="0.05"/>
<path id="p07" d="M27 56L30 59L27 62L7 62L4 59L7.00001 56L27 56Z" fill="white" fill-opacity="0.05"/>
<path id="p11" d="M67 -1.31134e-07L70 3L67 6L47 6L44 3L47 -1.00536e-06L67 -1.31134e-07Z" fill="white" fill-opacity="0.05"/>
<path id="p12" d="M40 7L43 4L46 7V27L43 30L40 27V7Z" fill="white" fill-opacity="0.05"/>
<path id="p13" d="M68 7L71 4L74 7V27L71 30L68 27V7Z" fill="white" fill-opacity="0.05"/>
<path id="p14" d="M67 28L70 31L67 34L47 34L44 31L47 28L67 28Z" fill="white" fill-opacity="0.05"/>
<path id="p15" d="M40 35L43 32L46 35V55L43 58L40 55V35Z" fill="white" fill-opacity="0.05"/>
<path id="p16" d="M68 35L71 32L74 35V55L71 58L68 55V35Z" fill="white" fill-opacity="0.05"/>
<path id="p17" d="M67 56L70 59L67 62L47 62L44 59L47 56L67 56Z" fill="white" fill-opacity="0.05"/>
<path id="p21" d="M107 -1.31134e-07L110 3L107 6L87 6L84 3L87 -1.00536e-06L107 -1.31134e-07Z" fill="white" fill-opacity="0.05"/>
<path id="p22" d="M80 7L83 4L86 7V27L83 30L80 27V7Z" fill="white" fill-opacity="0.05"/>
<path id="p23" d="M108 7L111 4L114 7V27L111 30L108 27V7Z" fill="white" fill-opacity="0.05"/>
<path id="p24" d="M107 28L110 31L107 34L87 34L84 31L87 28L107 28Z" fill="white" fill-opacity="0.05"/>
<path id="p25" d="M80 35L83 32L86 35V55L83 58L80 55V35Z" fill="white" fill-opacity="0.05"/>
<path id="p26" d="M108 35L111 32L114 35V55L111 58L108 55V35Z" fill="white" fill-opacity="0.05"/>
<path id="p27" d="M107 56L110 59L107 62L87 62L84 59L87 56L107 56Z" fill="white" fill-opacity="0.05"/>
<path id="p31" d="M147 -1.31134e-07L150 3L147 6L127 6L124 3L127 -1.00536e-06L147 -1.31134e-07Z" fill="white" fill-opacity="0.05"/>
<path id="p32" d="M120 7L123 4L126 7V27L123 30L120 27V7Z" fill="white" fill-opacity="0.05"/>
<path id="p33" d="M148 7L151 4L154 7V27L151 30L148 27V7Z" fill="white" fill-opacity="0.05"/>
<path id="p34" d="M147 28L150 31L147 34L127 34L124 31L127 28L147 28Z" fill="white" fill-opacity="0.05"/>
<path id="p35" d="M120 35L123 32L126 35V55L123 58L120 55V35Z" fill="white" fill-opacity="0.05"/>
<path id="p36" d="M148 35L151 32L154 35V55L151 58L148 55V35Z" fill="white" fill-opacity="0.05"/>
<path id="p37" d="M147 56L150 59L147 62L127 62L124 59L127 56L147 56Z" fill="white" fill-opacity="0.05"/>
</svg><style>`

const splitNumber = (number) => {
  let array = number.split('');
  return array;
}

const renderStyles = (p, number) => {
  if (number == 1) {
    return `#p${p}3,#p${p}6 {fill-opacity:1;}`
  } else if (number == 2) {
    return `#p${p}1,#p${p}3,#p${p}4,#p${p}5,#p${p}7 {fill-opacity:1;}`
  } else if (number == 3) {
    return `#p${p}1,#p${p}3,#p${p}4,#p${p}6,#p${p}7 {fill-opacity:1;}`
  } else if (number == 4) {
    return `#p${p}2,#p${p}3,#p${p}4,#p${p}6 {fill-opacity:1;}`
  } else if (number == 5) {
    return `#p${p}1,#p${p}2,#p${p}4,#p${p}6,#p${p}7 {fill-opacity:1;}`
  } else if (number == 6) {
    return `#p${p}1,#p${p}2,#p${p}4,#p${p}5,#p${p}6,#p${p}7 {fill-opacity:1;}`
  } else if (number == 7) {
    return `#p${p}1,#p${p}3,#p${p}6 {fill-opacity:1;}`
  } else if (number == 8) {
    return `#p${p}1,#p${p}2,#p${p}3,#p${p}4,#p${p}5,#p${p}6,#p${p}7 {fill-opacity:1;}`
  } else if (number == 9) {
    return `#p${p}1,#p${p}2,#p${p}3,#p${p}4,#p${p}6,#p${p}7 {fill-opacity:1;}`
  } else if (number == 0) {
    return `#p${p}1,#p${p}2,#p${p}3,#p${p}5,#p${p}6,#p${p}7 {fill-opacity:1;}`
  } else {
    console.log('invalid numbers')
  }
}

export function renderSvg(value) {
  let array = splitNumber(value.toString());
  let count = array.length;
  let start = 3;
  let svg = canvas;

  if (count == 2) {
    start = 2;
  } else if (count == 3) {
    start = 1;
  } else if (count == 4) {
    start = 0;
  } else if (count > 4) {
    console.log('too many number places')
    return;
  }

  let index = start;

  if (value > 0) {
    for (let i = 0; i < count; i++) {
      svg = svg + renderStyles(index, array[i]);
      index++;
    }
  }
  
  svg = svg + `</style></svg>`
  return svg;
}