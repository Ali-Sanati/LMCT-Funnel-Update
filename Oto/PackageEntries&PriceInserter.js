(function () {
  var defaultOtoImage =
    "https://pub-5daa6c7eb94c4316b99f8fb7c5b941b3.r2.dev/funnels/100k/ty-image.webp";

  var otoPackages = {
    "button-basic": {
      image: defaultOtoImage,
      entries: 1,
      price: 10,
    },

    "button-bronze": {
      image: "",
      entries: 5,
      price: 30,
    },

    "button-silver": {
      image: "",
      entries: 25,
      price: 100,
    },

    "button-gold": {
      image: "",
      entries: 100,
      price: 200,
    },

    "button-platinum": {
      image: "",
      entries: 500,
      price: 500,
    },
  };

  var storageKey = "lmctOtoSelectedPackage";

  function formatMoney(value, withDecimals) {
    var number = Number(value) || 0;

    if (withDecimals) {
      return "$" + number.toFixed(2);
    }

    return number % 1 === 0 ? "$" + number.toFixed(0) : "$" + number.toFixed(2);
  }

  function getUrlPackage() {
    var params = new URLSearchParams(window.location.search);
    var value =
      params.get("otoPackage") ||
      params.get("package") ||
      params.get("boostPackage");

    if (!value) return "";

    value = value.trim();

    if (otoPackages[value]) return value;

    var withPrefix = "button-" + value.replace("button-", "");

    return otoPackages[withPrefix] ? withPrefix : "";
  }

  function savePackage(packageKey) {
    try {
      localStorage.setItem(storageKey, packageKey);
      sessionStorage.setItem(storageKey, packageKey);
    } catch (e) {}
  }

  function getSavedPackage() {
    try {
      return (
        sessionStorage.getItem(storageKey) ||
        localStorage.getItem(storageKey) ||
        ""
      );
    } catch (e) {
      return "";
    }
  }

  function getPackageImage(data) {
    var image = data && data.image ? String(data.image).trim() : "";

    if (!image || image.indexOf("_URL_HERE") !== -1) {
      return defaultOtoImage;
    }

    return image;
  }

  function updateOto(packageKey, scope) {
    var data = otoPackages[packageKey];
    if (!data) return;

    var root = scope || document;

    var currentEntries = Number(data.entries) || 0;
    var afterBoost = currentEntries * 2;
    var bonusEntries = currentEntries;
    var wasPrice = Number(data.price) || 0;
    var offerPrice = wasPrice / 2;
    var packageImage = getPackageImage(data);

    var photo = root.querySelector(".otoBoostPhoto");
    var current = root.querySelector("#otoBoostCurrent");
    var after = root.querySelector("#otoBoostAfter");
    var bonus = root.querySelector("#otoBoostBonusText");
    var was = root.querySelector("#otoWasPrice");
    var offer = root.querySelector("#otoOfferPrice");
    var boostBox = root.querySelector(".otoBoostDesign");

    if (photo && packageImage) {
      photo.src = packageImage;
    }

    if (current) {
      current.textContent = currentEntries.toLocaleString();
    }

    if (after) {
      after.textContent = afterBoost.toLocaleString();
    }

    if (bonus) {
      bonus.textContent =
        "+" + bonusEntries.toLocaleString() + " Bonus Entries";
    }

    if (was) {
      was.textContent = formatMoney(wasPrice, true);
    }

    if (offer) {
      offer.textContent = formatMoney(offerPrice, false);
    }

    if (boostBox) {
      boostBox.setAttribute(
        "aria-label",
        "Current " +
          currentEntries.toLocaleString() +
          " entries boosted to " +
          afterBoost.toLocaleString() +
          " entries with " +
          bonusEntries.toLocaleString() +
          " bonus entries",
      );
    }
  }

  function updatePackageBlocks() {
    var updatedAnyBlock = false;

    Object.keys(otoPackages).forEach(function (packageKey) {
      var packageBlocks = document.querySelectorAll(
        '[data-title="' + packageKey + '"]',
      );

      packageBlocks.forEach(function (block) {
        if (!block.querySelector(".otoBoostDesign, .otoCheckoutOffer")) {
          return;
        }

        updateOto(packageKey, block);
        updatedAnyBlock = true;
      });
    });

    return updatedAnyBlock;
  }

  function appendPackageToUrl(url, packageKey) {
    if (!url || url === "#") return url;

    try {
      var parsedUrl = new URL(url, window.location.origin);
      parsedUrl.searchParams.set("otoPackage", packageKey);
      return parsedUrl.toString();
    } catch (e) {
      return url;
    }
  }

  function bindPackageButtons() {
    Object.keys(otoPackages).forEach(function (packageKey) {
      var buttonWraps = document.querySelectorAll(
        '[data-title="' + packageKey + '"]',
      );

      buttonWraps.forEach(function (wrap) {
        var links = wrap.querySelectorAll("a");

        links.forEach(function (link) {
          link.href = appendPackageToUrl(link.href, packageKey);
        });

        wrap.addEventListener("click", function () {
          savePackage(packageKey);
        });
      });
    });
  }

  function init() {
    bindPackageButtons();

    var selectedPackage =
      getUrlPackage() || getSavedPackage() || "button-basic";

    savePackage(selectedPackage);

    if (!updatePackageBlocks()) {
      updateOto(selectedPackage, document);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
