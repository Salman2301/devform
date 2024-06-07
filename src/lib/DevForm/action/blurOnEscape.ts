
export function blurOnEscape(node: HTMLElement) {
  
  function blurOnEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      node.blur();
    }
  }
  document.addEventListener('keydown', blurOnEscape);

  return {
    destroy() {
      document.removeEventListener('keydown', blurOnEscape);
    }
  }
}
