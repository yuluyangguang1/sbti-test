const sections = document.querySelectorAll('.min-h-screen > div:not(.liquid-bg)');
let result = [];
sections.forEach((el, i) => {
  const rect = el.getBoundingClientRect();
  result.push(`Section ${i}: left=${Math.round(rect.left)}, right_margin=${Math.round(window.innerWidth - rect.right)}, width=${Math.round(rect.width)}`);
});
result.join('\n');
