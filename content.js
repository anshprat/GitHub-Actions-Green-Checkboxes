// GitHub Actions Green Checkboxes - Content Script
// Handles dynamically loaded content on GitHub Actions pages

(function() {
  'use strict';

  // Debug flag - set to true to enable console logging
  const DEBUG = false;

  // Helper function for conditional logging
  function debugLog(...args) {
    if (DEBUG) {
      console.log(...args);
    }
  }

  debugLog('[GH Actions Checkbox] Script loaded on:', location.href);

  // Function to update grey checkboxes to green by adding color-fg-success class
  function updateCheckboxes() {
    debugLog('[GH Actions Checkbox] updateCheckboxes() called');
    
    // Find all SVG check circle icons
    const checkIcons = document.querySelectorAll('svg.octicon-check-circle-fill');
    debugLog('[GH Actions Checkbox] Found', checkIcons.length, 'check icons');
    
    let updatedCount = 0;
    
    checkIcons.forEach((icon, index) => {
      // Get the class list (handle both SVG className and classList)
      const classList = icon.classList || (icon.className ? icon.className.baseVal || icon.className : '');
      const hasColorFgSuccess = icon.classList ? icon.classList.contains('color-fg-success') : classList.includes('color-fg-success');
      
      debugLog(`[GH Actions Checkbox] Icon ${index}:`, {
        tagName: icon.tagName,
        classes: icon.classList ? Array.from(icon.classList).join(' ') : classList,
        hasColorFgSuccess: hasColorFgSuccess
      });
      
      // Only update if it doesn't already have the color-fg-success class
      if (!hasColorFgSuccess) {
        debugLog(`[GH Actions Checkbox] Adding color-fg-success class to icon ${index}`);
        
        // Add the color-fg-success class
        if (icon.classList) {
          icon.classList.add('color-fg-success');
        } else if (typeof icon.className === 'string') {
          icon.className = icon.className + ' color-fg-success';
        } else if (icon.className && icon.className.baseVal) {
          icon.className.baseVal = icon.className.baseVal + ' color-fg-success';
        }
        
        updatedCount++;
      } else {
        debugLog(`[GH Actions Checkbox] Icon ${index} already has color-fg-success class`);
      }
    });
    
    debugLog('[GH Actions Checkbox] Updated', updatedCount, 'icons');
  }

  // Initial update
  debugLog('[GH Actions Checkbox] Document readyState:', document.readyState);
  updateCheckboxes();

  // Observe DOM changes for dynamically loaded content
  const observer = new MutationObserver(function(mutations) {
    let shouldUpdate = false;
    let addedNodesCount = 0;
    
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        shouldUpdate = true;
        addedNodesCount += mutation.addedNodes.length;
      }
    });
    
    if (shouldUpdate) {
      debugLog('[GH Actions Checkbox] MutationObserver detected', addedNodesCount, 'added nodes, scheduling update');
      // Debounce updates
      setTimeout(updateCheckboxes, 100);
    }
  });

  // Start observing when DOM is ready
  if (document.readyState === 'loading') {
    debugLog('[GH Actions Checkbox] Waiting for DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', function() {
      debugLog('[GH Actions Checkbox] DOMContentLoaded fired');
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      debugLog('[GH Actions Checkbox] MutationObserver started');
      updateCheckboxes();
    });
  } else {
    debugLog('[GH Actions Checkbox] Document already loaded, starting observer immediately');
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    debugLog('[GH Actions Checkbox] MutationObserver started');
  }

  // Also update on navigation (GitHub uses SPA navigation)
  let lastUrl = location.href;
  debugLog('[GH Actions Checkbox] Initial URL:', lastUrl);
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      debugLog('[GH Actions Checkbox] URL changed from', lastUrl, 'to', url);
      lastUrl = url;
      setTimeout(updateCheckboxes, 500);
    }
  }).observe(document, { subtree: true, childList: true });
  debugLog('[GH Actions Checkbox] Navigation observer started');

})();

