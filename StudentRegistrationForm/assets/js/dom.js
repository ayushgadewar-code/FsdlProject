// dom.js
(function () {
  document.addEventListener("DOMContentLoaded", function () {

    // change heading (demo)
    var changeTextBtn = document.getElementById('changeTextBtn');
    if (changeTextBtn) {
      changeTextBtn.addEventListener('click', function () {
        var heading = document.getElementById('mainHeading');
        if (!heading) return;
        heading.innerHTML = 'You clicked the magic button ✨';
        heading.style.color = '#ffd86b';
        heading.style.position = 'relative';
        heading.style.left = '4px';
      });
    }

    // color all <p>
    var paras = document.getElementsByTagName('p');
    for (var i = 0; i < paras.length; i++) paras[i].style.color = '#cfeffc';

    // class-based tweak
    var mutedEls = document.getElementsByClassName('muted');
    for (var j = 0; j < mutedEls.length; j++) mutedEls[j].style.opacity = '0.9';

// swap image (use data-state attribute) - replace previous swap-image handler
var changeImageBtn = document.getElementById('changeImageBtn');
if (changeImageBtn) {
  changeImageBtn.addEventListener('click', function () {
    var img = document.getElementById('featureImage');
    if (!img) return;
    // initial state default 'a'
    var state = img.getAttribute('data-state') || 'a';
    if (state === 'a') {
      img.src = 'assets/images/student2.jpg';
      img.setAttribute('data-state', 'b');
    } else {
      img.src = 'assets/images/student1.jpg';
      img.setAttribute('data-state', 'a');
    }
  });
}

    // move card
    var moveCardBtn = document.getElementById('moveCardBtn');
    var demoCard = document.querySelector('.demo-card');
    var moved = false;
    if (moveCardBtn) {
      moveCardBtn.addEventListener('click', function () {
        if (!demoCard) return;
        if (!moved) {
          demoCard.style.transform = 'translateX(12px) translateY(-6px)';
          demoCard.style.boxShadow = '0 30px 60px rgba(2,6,23,0.6)';
        } else {
          demoCard.style.transform = '';
          demoCard.style.boxShadow = '';
        }
        moved = !moved;
      });
    }

    // Toggle title color
    var toggleBtn = document.getElementById("toggleThemeBtn");
    var heading = document.getElementById("mainHeading");
    if (toggleBtn && heading) {
      toggleBtn.addEventListener("click", function () {
        heading.style.color = heading.style.color === "cyan" ? "white" : "cyan";
      });
    }

    // Show form data (DOM approach) — writes to #formOutput
    var showBtn = document.getElementById("showFormDataBtn");
    if (showBtn) {
      showBtn.addEventListener("click", function () {
        var username = document.getElementById("username")?.value || "";
        var email = document.getElementById("email")?.value || "";
        var phone = document.getElementById("phone")?.value || "";
        var outputDiv = document.getElementById("formOutput");
        if (!outputDiv) return;
        outputDiv.innerHTML = `
          <h3>Form Data</h3>
          <p><strong>Username:</strong> ${escapeHtml(username)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        `;
      });
    }

  });

  // add text node
  window.addTextNode = function () {
    var container = document.getElementById('dynamicContainer');
    if (!container) return;
    var text = document.createTextNode(' • Dynamic node added at ' + new Date().toLocaleTimeString());
    container.appendChild(text);
    container.appendChild(document.createElement('br'));
  };

  // delete node
  window.deleteNode = function () {
    var container = document.getElementById('dynamicContainer');
    if (!container) return;
    if (container.lastChild) container.removeChild(container.lastChild);
  };

  function escapeHtml(s) {
    if (!s) return s;
    return s.replace(/[&<>"']/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
  }

})();

