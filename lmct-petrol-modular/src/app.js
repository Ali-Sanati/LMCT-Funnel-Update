(function () {
        "use strict";

        var ORDER_URL = "https://lmctgiveaway.com/order-639460901777617719067";
        var tierProducts = {
          fuel: "5073572",
          full: "5073573",
        };
        var tierCopy = {
          fuel: {
            price: "$99",
            unit: "/ year",
            note: "Less than $2 per week",
            hero: "Join LMCT+ Petrol for $99 per year and access member pricing and available everyday savings at participating locations.",
            signup: "$99/year",
            label: "Everyday Saver Membership",
          },
          full: {
            price: "$199",
            unit: "/ year",
            note: "Everyday savings plus giveaway access",
            hero: "Upgrade to Save + Win for fuel, groceries, and the giveaway product shown in the existing funnel.",
            signup: "$199/year",
            label: "Save + Win Membership",
          },
        };

        function qs(selector, root) {
          return (root || document).querySelector(selector);
        }

        function qsa(selector, root) {
          return Array.prototype.slice.call(
            (root || document).querySelectorAll(selector),
          );
        }

        function money(value, round) {
          var n = Number(value);
          if (!isFinite(n)) n = 0;
          return (
            "$" +
            n.toLocaleString("en-AU", {
              minimumFractionDigits: round ? 0 : 2,
              maximumFractionDigits: round ? 0 : 2,
            })
          );
        }

        function setText(id, text) {
          var el = document.getElementById(id);
          if (el) el.textContent = text;
        }

        function setTier(tier) {
          tier = tier === "full" ? "full" : "fuel";
          var hero = document.getElementById("susTier");
          var proof = document.getElementById("susProof");
          var copy = tierCopy[tier];
          if (hero) hero.setAttribute("data-tier", tier);
          if (proof) proof.setAttribute("data-tier", tier);

          qsa(".sus-toggle-btn").forEach(function (btn) {
            var active = btn.getAttribute("data-tier-target") === tier;
            btn.setAttribute("aria-selected", active ? "true" : "false");
          });

          setText("heroPrice", copy.price);
          setText("heroPriceUnit", copy.unit);
          setText("heroPriceNote", copy.note);
          setText("heroCopy", copy.hero);
          setText("signupPrice", copy.signup);
          setText("signupPriceLabel", copy.label);

          var tierInput = document.getElementById("lmMembershipTierInput");
          if (tierInput) tierInput.value = tier;

          syncCheckoutProduct(tier);

          try {
            sessionStorage.setItem("sus-tier", tier);
          } catch (e) {}

          if (hero && typeof CustomEvent === "function") {
            hero.dispatchEvent(
              new CustomEvent("tierchange", { detail: { tier: tier } }),
            );
          }
        }

        function syncCheckoutProduct(tier) {
          tier = tier === "full" ? "full" : "fuel";
          var productId = tierProducts[tier];
          if (!productId) return;

          var radios = qsa(
            'input[name="purchase[product_id]"], input[name="purchase[product_ids][]"]',
          );
          radios.forEach(function (radio) {
            var checked = radio.value === productId;
            radio.checked = checked;
            if (checked) {
              radio.setAttribute("checked", "checked");
            } else {
              radio.removeAttribute("checked");
            }
            radio.dispatchEvent(new Event("change", { bubbles: true }));
          });

          document.body.setAttribute("data-lmct-tier", tier);

          if (window.jQuery) {
            window.jQuery(document).trigger("cfpt:cart-updated");
          }
          if (typeof window.rebuildOrderSummary === "function") {
            window.rebuildOrderSummary();
          }
        }

        qsa(".sus-toggle-btn").forEach(function (btn) {
          btn.addEventListener("click", function () {
            setTier(btn.getAttribute("data-tier-target"));
          });
        });

        (function initHeader() {
          var header = document.getElementById("siteHeader");
          var menuBtn = document.getElementById("siteMenuBtn");
          if (!header || !menuBtn) return;
          menuBtn.addEventListener("click", function () {
            var open = !header.classList.contains("is-open");
            header.classList.toggle("is-open", open);
            menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
          });
          qsa(".site-nav a").forEach(function (link) {
            link.addEventListener("click", function () {
              header.classList.remove("is-open");
              menuBtn.setAttribute("aria-expanded", "false");
            });
          });
        })();

        (function initCalculator() {
          var root = document.getElementById("lmcalc");
          if (!root) return;

          var config = {
            prices: {
              petrol: { lmct: 1.59, avg: 1.85 },
              diesel: { lmct: 2.049, avg: 2.45 },
            },
            membershipFee: 99,
            groceries: {
              enabled: false,
              discountPct: 15,
              defaultWeeklySpend: 200,
            },
          };
          var cars = [
            {
              name: "Ford Ranger",
              tank: 80,
              fuel: "diesel",
              hint: "Popular ute",
            },
            {
              name: "Toyota HiLux",
              tank: 80,
              fuel: "diesel",
              hint: "Popular ute",
            },
            {
              name: "Toyota RAV4",
              tank: 55,
              fuel: "petrol",
              hint: "Popular SUV",
            },
            {
              name: "Toyota LandCruiser",
              tank: 110,
              fuel: "diesel",
              hint: "Large 4WD",
            },
            {
              name: "Toyota Corolla",
              tank: 50,
              fuel: "petrol",
              hint: "Small car",
            },
            { name: "Isuzu D-Max", tank: 76, fuel: "diesel", hint: "Ute" },
            { name: "Mazda CX-5", tank: 58, fuel: "petrol", hint: "SUV" },
            {
              name: "Mitsubishi Triton",
              tank: 75,
              fuel: "diesel",
              hint: "Ute",
            },
          ];
          var state = {
            car: cars[2],
            manualFuel: "petrol",
            manualTank: 55,
            fillsPerWeek: 1,
            weeklyGrocery: config.groceries.defaultWeeklySpend,
            priceOverride: {
              petrol: { lmct: null, avg: null },
              diesel: { lmct: null, avg: null },
            },
          };

          var carGrid = document.getElementById("lmcalcCarGrid");
          var search = document.getElementById("lmcalcSearch");
          var tankInput = document.getElementById("lmcalcTankInput");
          var priceLmct = document.getElementById("lmcalcPriceLmct");
          var priceAvg = document.getElementById("lmcalcPriceAvg");

          function renderCars(filter) {
            if (!carGrid) return;
            var f = (filter || "").trim().toLowerCase();
            var visible = cars.filter(function (car) {
              return !f || car.name.toLowerCase().indexOf(f) !== -1;
            });
            if (!visible.length) {
              carGrid.innerHTML =
                '<button class="lmcalc-car" type="button" data-manual="true">Use manual details<span>Enter tank size and fuel type</span></button>';
              return;
            }
            carGrid.innerHTML = visible
              .map(function (car) {
                var active = state.car && state.car.name === car.name;
                return (
                  '<button class="lmcalc-car' +
                  (active ? " is-active" : "") +
                  '" type="button" data-car="' +
                  escapeAttr(car.name) +
                  '">' +
                  escapeHtml(car.name) +
                  "<span>" +
                  car.tank +
                  "L " +
                  escapeHtml(car.fuel) +
                  " - " +
                  escapeHtml(car.hint) +
                  "</span></button>"
                );
              })
              .join("");
          }

          function escapeHtml(text) {
            return String(text).replace(/[&<>"']/g, function (m) {
              return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
              }[m];
            });
          }

          function escapeAttr(text) {
            return escapeHtml(text);
          }

          function getFuel() {
            return state.car ? state.car.fuel : state.manualFuel;
          }

          function getTank() {
            return state.car ? state.car.tank : Number(state.manualTank || 55);
          }

          function getFuelPrices(fuel) {
            var base = config.prices[fuel] || config.prices.petrol;
            var override = state.priceOverride[fuel] || {};
            return {
              lmct: override.lmct != null ? override.lmct : base.lmct,
              avg: override.avg != null ? override.avg : base.avg,
            };
          }

          function calc() {
            var fuel = getFuel();
            var tank = getTank();
            var fpw = Number(state.fillsPerWeek || 0);
            var prices = getFuelPrices(fuel);
            var perLitreSave = Math.max(0, prices.avg - prices.lmct);
            var perFillSave = perLitreSave * tank;
            var fillsPerYear = fpw * 52;
            var fuelYearSave = perFillSave * fillsPerYear;
            var grocYearSave = config.groceries.enabled
              ? state.weeklyGrocery * (config.groceries.discountPct / 100) * 52
              : 0;
            var yearSave = fuelYearSave + grocYearSave;
            var monthSave = yearSave / 12;
            var daySave = yearSave / 365;
            var fee = config.membershipFee;
            var netBenefit = yearSave - fee;
            return {
              fuel: fuel,
              tank: tank,
              lmct: prices.lmct,
              avg: prices.avg,
              perFillSave: perFillSave,
              fillsPerYear: fillsPerYear,
              yearSave: yearSave,
              monthSave: monthSave,
              daySave: daySave,
              fee: fee,
              netBenefit: netBenefit,
              fillsToPayback: perFillSave > 0 ? fee / perFillSave : Infinity,
              daysToPayback: daySave > 0 ? fee / daySave : Infinity,
            };
          }

          function render() {
            var result = calc();
            var roundedYear = Math.round(result.yearSave);
            var roundedNet = Math.round(result.netBenefit);
            var meter = document.getElementById("lmcalcMeter");
            var currentFuel = getFuel();
            var prices = getFuelPrices(currentFuel);

            document.getElementById("lmcalcBigNumber").innerHTML =
              '<span class="lmcalc-big-currency">$</span>' +
              roundedYear.toLocaleString("en-AU");
            setText("lmcalcMonth", money(result.monthSave, true));
            setText("lmcalcDay", money(result.daySave, false));
            setText("lmcalcFill", money(result.perFillSave, false));
            setText("lmcalcBdTank", result.tank + " L");
            setText("lmcalcBdAvg", money(result.avg * result.tank, false));
            setText("lmcalcBdLmct", money(result.lmct * result.tank, false));
            setText("lmcalcBdPerFill", money(result.perFillSave, false));
            setText(
              "lmcalcBdFills",
              Math.round(result.fillsPerYear) + " fills",
            );
            setText("lmcalcBdYear", money(result.yearSave, true));
            setText(
              "heroSavingsExample",
              roundedYear > 0
                ? money(result.yearSave, true) + " estimated by the calculator"
                : "Use the calculator for your estimate",
            );

            if (meter) {
              meter.style.width =
                Math.max(8, Math.min(100, roundedYear / 15)) + "%";
            }

            var payback = document.getElementById("lmcalcPayback");
            if (payback) {
              if (result.perFillSave <= 0) {
                payback.innerHTML =
                  "Adjust your prices to see when membership pays itself off.";
              } else if (result.fillsToPayback <= 1) {
                payback.innerHTML =
                  "Membership pays for itself in <strong>just 1 fill</strong>.";
              } else {
                payback.innerHTML =
                  "Membership pays for itself in <strong>" +
                  Math.ceil(result.fillsToPayback) +
                  " fills</strong>.";
              }
            }

            var roi = document.getElementById("lmcalcRoi");
            if (roi) {
              roi.innerHTML =
                "Estimated net benefit: <strong>" +
                money(roundedNet, true) +
                "</strong> after the $" +
                result.fee +
                " yearly fee.";
            }

            if (priceLmct && document.activeElement !== priceLmct) {
              priceLmct.value = (prices.lmct * 100).toFixed(1);
            }
            if (priceAvg && document.activeElement !== priceAvg) {
              priceAvg.value = (prices.avg * 100).toFixed(1);
            }
          }

          renderCars("");

          if (carGrid) {
            carGrid.addEventListener("click", function (event) {
              var btn = event.target.closest(".lmcalc-car");
              if (!btn) return;
              var carName = btn.getAttribute("data-car");
              if (!carName) {
                state.car = null;
              } else {
                state.car =
                  cars.filter(function (car) {
                    return car.name === carName;
                  })[0] || state.car;
                if (tankInput && state.car) tankInput.value = state.car.tank;
                state.manualFuel = state.car
                  ? state.car.fuel
                  : state.manualFuel;
              }
              qsa(".lmcalc-fuel-btn", root).forEach(function (fuelBtn) {
                var active = fuelBtn.getAttribute("data-fuel") === getFuel();
                fuelBtn.classList.toggle("is-active", active);
                fuelBtn.setAttribute(
                  "aria-selected",
                  active ? "true" : "false",
                );
              });
              renderCars(search ? search.value : "");
              render();
            });
          }

          if (search) {
            search.addEventListener("input", function () {
              renderCars(search.value);
            });
          }

          qsa(".lmcalc-fuel-btn", root).forEach(function (btn) {
            btn.addEventListener("click", function () {
              state.car = null;
              state.manualFuel = btn.getAttribute("data-fuel");
              qsa(".lmcalc-fuel-btn", root).forEach(function (b) {
                var active = b === btn;
                b.classList.toggle("is-active", active);
                b.setAttribute("aria-selected", active ? "true" : "false");
              });
              renderCars(search ? search.value : "");
              render();
            });
          });

          if (tankInput) {
            tankInput.addEventListener("input", function () {
              state.car = null;
              state.manualTank = Number(tankInput.value || 55);
              renderCars(search ? search.value : "");
              render();
            });
          }

          qsa(".lmcalc-freq", root).forEach(function (btn) {
            btn.addEventListener("click", function () {
              state.fillsPerWeek = Number(btn.getAttribute("data-fpw"));
              qsa(".lmcalc-freq", root).forEach(function (b) {
                b.classList.toggle("is-active", b === btn);
              });
              render();
            });
          });

          qsa("[data-toggle]", document).forEach(function (btn) {
            btn.addEventListener("click", function () {
              var action = btn.getAttribute("data-toggle");
              if (action === "prices") {
                var pricesPanel = document.getElementById("lmcalcPrices");
                if (pricesPanel) pricesPanel.classList.toggle("is-open");
              } else if (action === "breakdown") {
                var breakdown = document.getElementById("lmcalcBreakdown");
                if (breakdown) breakdown.classList.toggle("is-open");
              } else if (action === "restart") {
                state.car = cars[2];
                state.manualFuel = "petrol";
                state.manualTank = 55;
                state.fillsPerWeek = 1;
                if (tankInput) tankInput.value = 55;
                if (search) search.value = "";
                qsa(".lmcalc-freq", root).forEach(function (b) {
                  b.classList.toggle(
                    "is-active",
                    b.getAttribute("data-fpw") === "1",
                  );
                });
                renderCars("");
                render();
              }
            });
          });

          if (priceLmct) {
            priceLmct.addEventListener("input", function () {
              var fuel = getFuel();
              state.priceOverride[fuel].lmct =
                Number(priceLmct.value || 0) / 100;
              render();
            });
          }
          if (priceAvg) {
            priceAvg.addEventListener("input", function () {
              var fuel = getFuel();
              state.priceOverride[fuel].avg = Number(priceAvg.value || 0) / 100;
              render();
            });
          }

          var calcCta = document.getElementById("lmcalcCta");
          if (calcCta) {
            calcCta.addEventListener("click", function (event) {
              var target = document.getElementById("row--30567");
              if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            });
          }

          render();
        })();

        (function initForm() {
          var form = document.getElementById("lmctStandaloneCheckout");
          if (!form) return;

          function setError(id, message) {
            var el = document.getElementById(id);
            if (el) el.textContent = message || "";
          }

          form.addEventListener("submit", function (event) {
            var valid = true;
            var name = document.getElementById("lmFullName");
            var email = document.getElementById("lmEmail");
            var phone = document.getElementById("lmPhone");
            var terms = document.getElementById("lmTerms");

            setError("lmFullNameError", "");
            setError("lmEmailError", "");
            setError("lmPhoneError", "");
            setError("lmTermsError", "");

            if (!name || !name.value.trim()) {
              valid = false;
              setError("lmFullNameError", "Enter your full name.");
            }
            if (
              !email ||
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
            ) {
              valid = false;
              setError("lmEmailError", "Enter a valid email address.");
            }
            if (!phone || phone.value.replace(/\D/g, "").length < 8) {
              valid = false;
              setError("lmPhoneError", "Enter a valid phone number.");
            }
            if (!terms || !terms.checked) {
              valid = false;
              setError(
                "lmTermsError",
                "Accept the membership terms to continue.",
              );
            }

            if (!valid) {
              event.preventDefault();
              var firstError = qs(".form-error:not(:empty)");
              if (firstError)
                firstError.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
            }
          });
        })();

        (function initApplePayRelocation() {
          var applePaySelector = "#tmp_oapap-89166";
          var step2CardFormSelector =
            "#tmp_order2step-95906 .o2step_step2 .elCreditCardForm";

          function moveApplePay() {
            var applePay = qs(applePaySelector);
            var target = qs(step2CardFormSelector);
            if (!applePay || !target) return false;
            if (
              target.nextElementSibling &&
              target.nextElementSibling.classList.contains(
                "express-checkout-wrap",
              )
            )
              return true;
            var wrap = document.createElement("div");
            wrap.className = "express-checkout-wrap";
            var label = document.createElement("div");
            label.className = "express-checkout-label";
            label.innerHTML = "<span>OR EXPRESS CHECKOUT</span>";
            wrap.appendChild(label);
            target.parentNode.insertBefore(wrap, target.nextSibling);
            wrap.appendChild(applePay);
            return true;
          }

          function tryMoveApplePay() {
            if (moveApplePay()) return;
            var tries = 0;
            var timer = setInterval(function () {
              tries += 1;
              if (moveApplePay() || tries > 20) clearInterval(timer);
            }, 400);
          }

          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", tryMoveApplePay);
          } else {
            tryMoveApplePay();
          }

          document.addEventListener("click", function (event) {
            if (
              !event.target.closest(
                '#tmp_order2step-95906 .o2step_step1 a, #tmp_order2step-95906 .o2step_step1 button, #tmp_order2step-95906 .o2step_step1 input[type="submit"]',
              )
            )
              return;
            setTimeout(moveApplePay, 300);
            setTimeout(moveApplePay, 800);
            setTimeout(moveApplePay, 1600);
          });
        })();

        (function initGiveaways() {
          var list = document.getElementById("susPrizeList");
          if (!list || !window.fetch) return;
          var API =
            "https://api.lmctplus.com/api/v1/giveaways?limit=9&offset=0&status=active";

          function esc(text) {
            var d = document.createElement("div");
            d.textContent = text == null ? "" : String(text);
            return d.innerHTML;
          }

          function validLink(url) {
            return url && url !== "tbd" && /^https?:\/\//i.test(url);
          }

          function pickLink(giveaway) {
            if (validLink(giveaway.publicPromotionLink))
              return giveaway.publicPromotionLink;
            if (validLink(giveaway.promotionLink))
              return giveaway.promotionLink;
            return "https://lmctgiveaway.com";
          }

          function render(items) {
            if (!items || !items.length) {
              list.innerHTML =
                '<p class="sus-prize-empty">No live giveaways right now. Check back soon.</p>';
              return;
            }
            list.innerHTML = items
              .slice(0, 6)
              .map(function (g) {
                var title =
                  g.prizes && g.prizes[0] && g.prizes[0].title
                    ? g.prizes[0].title
                    : g.title;
                var img = g.image || "";
                return (
                  '<a class="sus-prize" href="' +
                  esc(pickLink(g)) +
                  '" target="_blank" rel="noopener">' +
                  '<span class="sus-prize-imgwrap"><img class="sus-prize-img" src="' +
                  esc(img) +
                  '" alt="' +
                  esc(g.title || title) +
                  '" loading="lazy"></span>' +
                  '<span class="sus-tag">Live</span>' +
                  '<div class="sus-prize-body"><h3 class="sus-prize-title">' +
                  esc(title) +
                  "</h3></div>" +
                  "</a>"
                );
              })
              .join("");
          }

          fetch(API, { headers: { Accept: "application/json" } })
            .then(function (response) {
              if (!response.ok) throw new Error("HTTP " + response.status);
              return response.json();
            })
            .then(function (payload) {
              render(payload && payload.data ? payload.data : []);
            })
            .catch(function () {
              list.innerHTML =
                '<p class="sus-prize-empty">Giveaways are taking a moment to load. Please refresh.</p>';
            });
        })();

        (function initStickyCta() {
          var sticky = document.getElementById("mobileStickyCta");
          if (!sticky || !window.IntersectionObserver) return;
          var targets = ["row--30567", "footer"]
            .map(function (id) {
              return document.getElementById(id);
            })
            .filter(Boolean);
          var observer = new IntersectionObserver(
            function (entries) {
              var hide = entries.some(function (entry) {
                return entry.isIntersecting;
              });
              sticky.classList.toggle("is-hidden", hide);
            },
            { threshold: 0.08 },
          );
          targets.forEach(function (target) {
            observer.observe(target);
          });
        })();

        (function initTierFromState() {
          var initialTier = "fuel";
          try {
            var params = new URLSearchParams(window.location.search);
            var urlTier = params.get("tier");
            var saved = sessionStorage.getItem("sus-tier");
            if (urlTier === "fuel" || urlTier === "full") initialTier = urlTier;
            else if (saved === "fuel" || saved === "full") initialTier = saved;
          } catch (e) {}
          setTier(initialTier);
        })();
      })();
