$(document).ready(function () {

    if ($(".flickity-button").length > 0) {
        $(".flickity-button").html(`<svg class="arrowIcon" viewBox="0 0 22 22"><path fill="currentColor" fill-rule="nonzero" d="M16.986 10.514a.688.688 0 010 .972l-3.667 3.667a.687.687 0 11-.972-.973l2.493-2.493H5.5a.688.688 0 010-1.375h9.34L12.347 7.82a.688.688 0 01.972-.972l3.667 3.667z"/></svg>`)
    }

    if ($(".image-with-text__text strong").length > 0) {
        $(".image-with-text__text strong").prepend(`<span class="checkIcon"><svg viewBox="0 0 22 22"><path fill="currentColor" fill-rule="evenodd" d="M11 20.167a9.167 9.167 0 100-18.334 9.167 9.167 0 000 18.334zm4.21-11.495a.687.687 0 10-1.086-.844l-3.673 4.722a.23.23 0 01-.334.03L7.793 10.49a.688.688 0 00-.92 1.022l2.324 2.091a1.604 1.604 0 002.34-.207l3.672-4.723z"/></svg></span>`)
        if ($(".image-with-text__text strong").closest(".image-with-text__text").length > 0) {
            $(".image-with-text__text strong").closest(".image-with-text__text").addClass("hasStrong");
        }
    }
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 40) {
            $('body').addClass('contentIsScrolled');
        } else {
            $('body').removeClass('contentIsScrolled');
        }
    });


    $(".mobileMenuOpener").click(function () {
        $(".mobile-header").toggleClass("isOpen");
        $("body, html").toggleClass("hideScroll");
    });

    $('.customLoadMoreBtm').click(function () {
        var $thisBtn = $(this);
        $($thisBtn).addClass("is-loading");
        var $hiddenContainer = $(this).prev('.collectionItemsRow');
        setTimeout(function () {
            $($thisBtn).removeClass("is-loading");
            $hiddenContainer.find('.hiddenItem').slice(0, 6).removeClass('hiddenItem');
            if ($hiddenContainer.find('.hiddenItem').length === 0) {
                $($thisBtn).hide();
            }
        }, 2000);

    });

    $(".tabBtn").click(function () {
        $(".tabBtn").removeClass("active");
        $(this).addClass("active");
        var $activeTabContent = $(this).attr("data-id");
        $(".tabContentsContainer").addClass("bigSection");
        $(".weeklyMenuTabItem").hide();
        $(".tabContentsContainer .collection__loading-icon").show();
        setTimeout(function () {
            $(".tabContentsContainer .collection__loading-icon").hide();
            $($activeTabContent).show();
            $(".tabContentsContainer").removeClass("bigSection");
        }, 1500);
    });

    $(".mobileFilterOpener").click(function () {
        $(".mainCollectionSec").addClass("showFilters");
        $("body, html").addClass("hideScroll");
    });

    $(".mobileFilterCloseBtn, .filterOverlay").click(function () {
        $(".mainCollectionSec").removeClass("showFilters");
        $("body, html").removeClass("hideScroll");
    });

    $(".filterDrawerOpener").click(function () {
        $(".mainCollectionSec").addClass("showFilters");
        $("body, html").addClass("hideScroll");
    });

    $(document).on('click', '.prodIngPopupOpener', function () {
        var popupId = $(this).attr("data-id");
        if ($(".popupBodyContainer").length > 0) {
            $(".popupBodyContainer").html("");
            $(".prodIngPopup").removeClass("openIt");
            var triggeredPopupHtml = $(popupId).html();
            $(".popupBodyContainer").html(triggeredPopupHtml);
            $(".popupBodyContainer .prodIngPopup").addClass("openIt");
            $("body, html").addClass("hideScroll");
        }
    });

    $(document).on('click', '.popupCloseBtn', function () {
        $(".prodIngPopup").removeClass("openIt");
        $("body, html").removeClass("hideScroll");
        $(".popupBodyContainer").html("");
    });

    $(".faqGroupOpener").click(function () {
        var faqActiveItems = $(this).attr("data-heading");
        var activeFaqGroupHeading = $(this).text();
        $(".faqItems").hide();
        $(".faqGroupOpener").removeClass("button--secondary active").addClass("button--primary");
        $(this).removeClass("button--primary").addClass("button--secondary active");
        $(faqActiveItems).fadeIn(200);
        $(".activeFaqHeading").text(activeFaqGroupHeading);
    });

    $(".accordianOpener").click(function () {
        $(this).toggleClass("active");
        $(this).next(".accordianContent").slideToggle("200");
    });

    $(".customDropDownBtn").click(function () {
        $(this).parent(".customSortBtnsContainer").toggleClass("activeDropDown");
    });

    $(".sortBtn").click(function () {
        var activeSortTxt = $(this).text();
        var activeSortVal = $(this).attr("data-val");
        $(".sortBtn").removeClass("active");
        $(this).addClass("active");
        $(this).parent(".dropDownItems").prev(".customDropDownBtn").children("span").text(activeSortTxt);
        $(".customSortBtnsContainer").removeClass("activeDropDown");
        $("#sort-by").val(activeSortVal).change();
        if ($(".showSquareImages").length > 0) {
            var firstImageWidth = $('.showSquareImages .product__imageContainer .image-element__wrap img').first().width();
            var cssRule = '.showSquareImages .product__imageContainer .image-element__wrap img { height: ' + firstImageWidth + 'px; }';
            if ($("#extraStyle").length < 1) {
                $('body').append('<style id="extraStyle">' + cssRule + '</style>');
            }
        }
    });

    $(".ftAccordianBtn").click(function () {
        $(this).toggleClass("active");
        $(this).next(".ftAccordianContent").slideToggle("200");
    });
    // Cart Page Note Text Area code start 

    function updateCartNote() {
        var note = '';
        $('.deliverySmallNotes .checkboxItem input:checked').each(function () {
            note += $(this).parent().text().trim() + '\n';
        });
        var accessCode = $('input[name="accessCode"]').val().trim();
        if (accessCode !== '') {
            note += 'Access Code: ' + accessCode + '\n';
        }
        var dummyText = $('.dummyTextArea').val().trim();
        if (dummyText !== '') {
            note += 'Other: ' + dummyText + '\n';
        }
        $('#cartNote').val(note);
    }

    $('.deliverySmallNotes .checkboxItem input').change(updateCartNote);
    $('input[name="accessCode"]').on('input', updateCartNote);
    $('.dummyTextArea').on('input', updateCartNote);

    // Cart Page Note Text Area code end



    /* =========== PURCHASE FLOW  CODE START =========== */


    // header zip code collector form code start 
    $('#headerZipCode').submit(function (event) {
        event.preventDefault();
        if ($('#headerZipCode input[name="zipCode"]').length > 0) {
            var zipCode = $('#headerZipCode input[name="zipCode"]').val();
            var url = "/pages/plans?zipCode=" + zipCode;
            window.location.href = url;
        }
    });

    if ($('#headerZipCode input[name="zipCode"]').length > 0) {
        var savedZipCode = localStorage.getItem('correctZipcode');
        if (savedZipCode) {
            $('#headerZipCode input[name="zipCode"]').val(savedZipCode);
        }
    }
    // header zip code collector form code end 

    // zip code checker code start 
    $('.zipCodeSubmit').click(function () {
        var enteredZipCode = $('input#zipCodeCollector').val().trim();
        var availableZipCodes = $('#availableZipCodes').length ? JSON.parse($('#availableZipCodes').text()) : null;
        if (enteredZipCode === '') {
            $('input#zipCodeCollector').addClass('error').attr('placeholder', 'Please enter a zip code').val("");
        } else if (!/^\d{5}$/.test(enteredZipCode)) {
            $('input#zipCodeCollector').addClass('error').attr('placeholder', 'Invalid zip code format').val("");
            return;
        } else {
            $('input#zipCodeCollector').removeClass('error').attr('placeholder', 'Zip Code');
            if (availableZipCodes && availableZipCodes.zipCodes.includes(enteredZipCode)) {
                $(".zipCodeCheckerSection .collection__loading-icon").show();
                $(".zipCodeCheckerFormContainer").hide();
                localStorage.setItem('correctZipcode', enteredZipCode);
                setTimeout(function () {
                    $(".zipCodeCheckerSection .collection__loading-icon").hide();
                    window.location.href = "/pages/customize-plans";
                }, 1500);

            } else {
                $(".zipCodeCheckerSection .collection__loading-icon").show();
                $(".zipCodeCheckerFormContainer").hide();
                setTimeout(function () {
                    $(".zipCodeCheckerSection .collection__loading-icon").hide();
                    $('.zipCodeCheckerFormContainer.errorZipCodeForm').fadeIn(200);
                    $("#zipForSubmission").val($("input#zipCodeCollector").val());
                }, 1500);

            }
        }
    });

    $('input#zipCodeCollector').on('focus', function () {
        $(this).removeClass('error').attr('placeholder', 'Zip Code');
    });

    $('input#zipCodeCollector').on('input', function () {
        $(this).removeClass('error').attr('placeholder', 'Zip Code');
    });

    $('input#zipCodeCollector').on('paste', function () {
        var input = $(this);
        setTimeout(function () {
            input.removeClass('error').attr('placeholder', 'Zip Code');
        }, 10);
    });

    // zip code checker code end

    // $(".flowBtn").click(function () {
    //     $(".flowBtn").removeClass("active prevActive");
    //     $(this).prevAll(".flowBtn").addClass("prevActive");
    //     $(this).addClass("active");
    // });

    $('.copyTxtBtn').click(function () {
        var copyText = $(this).attr('data-copy');
        var $tempInput = $('<input>');
        $tempInput.val(copyText);
        $('body').append($tempInput);
        $tempInput.select();
        document.execCommand('copy');
        $tempInput.remove();
        alert('Text copied to clipboard: ' + copyText);
    });

    // Prefrences Button and Prefrences Function Code Start
    function updatePreferences() {
        var preferences = [];
        $(".prefrenceBtn.active .btnTxt").each(function () {
            preferences.push($(this).text().trim());
        });
        localStorage.setItem("preferences", JSON.stringify(preferences));
        if ($(".selectedPreference").length > 0) {
            var selectedPreferences = preferences;
            if (selectedPreferences.length > 1) {
                $(".selectedPreference").text("Multiple Preferences");
            }
            else {
                $(".selectedPreference").text(selectedPreferences);
            }
        }
    }

    $("button.prefrenceBtn").click(function () {
        $("button.prefrenceBtn").removeClass("showError");
        $(this).toggleClass("active");
        updatePreferences();
    });

    function loadPreferences() {
        var storedPreferences = localStorage.getItem("preferences");
        if (storedPreferences && storedPreferences.trim() !== "" && storedPreferences.trim() !== "[]" && $(".prefrenceBtn").length > 0) {
            var preferences = JSON.parse(storedPreferences);
            preferences.forEach(function (preference) {
                $(".prefrenceBtn .btnTxt:contains('" + preference + "')").closest("button").addClass("active");
            });
            if ($(".selectedPreference").length > 0) {
                var selectedPreferences = preferences;
                if (selectedPreferences.length > 1) {
                    $(".selectedPreference").text("Multiple Preferences");
                }
                else {
                    $(".selectedPreference").text(selectedPreferences);
                }
            }
        }
    }

    function updatePrefrencesField() {
        var storedPreferences = localStorage.getItem("preferences");
        var formattedPreferences = "";
        if (storedPreferences && storedPreferences.trim() !== "" && storedPreferences.trim() !== "[]") {
            var preferences = JSON.parse(storedPreferences);
            if (preferences.length > 1) {
                formattedPreferences = preferences.join(", ");
            } else if (preferences.length === 1) {
                formattedPreferences = preferences[0];
            }
        }
        if ($("#prefrencesField").length > 0) {
            $("#prefrencesField").val(formattedPreferences);
        }
    }

    loadPreferences();
    updatePrefrencesField();
    // Prefrences Button and Prefrences Function Code End


    // Select Prod Box Tab Buttons, Variant Tab Buttons and  Function Code Start
    $("button.prodBoxMainSelector").click(function () {
        $("button.prodBoxMainSelector").removeClass("active");
        $(this).addClass("active");
        $(".prodBoxVariantSelectionBox").hide();
        $(".prodChangeLoader").show();
        var thisTabContent = $(this).attr("data-tabId");
        $("button.prodBoxMainSelector").addClass("disabledBtn");
        setTimeout(function () {
            $(".variantChangeLoader, .prodChangeLoader").hide();
            $(thisTabContent).fadeIn(200);
            $("button.prodBoxMainSelector").removeClass("disabledBtn");
        }, 600);

    });

    $("button.variantBtn").click(function () {
        $(this).parent(".variantBtnsContainer").children("button.variantBtn").removeClass("active");
        $(this).addClass("active");
        $(this).parent(".variantBtnsContainer").next(".variantsInfoBoxes").children(".varianInfoTabContent").hide();
        $(this).parent(".variantBtnsContainer").next(".variantsInfoBoxes").children(".variantChangeLoader").show();
        var thisVariantTabContent = $(this).attr("data-tabId");
        $("button.variantBtn").addClass("disabledBtn");
        setTimeout(function () {
            $(".variantChangeLoader, .prodChangeLoader").hide();
            $(thisVariantTabContent).fadeIn(200);
            $("button.variantBtn").removeClass("disabledBtn");
        }, 600);

    });

    // Select Prod Box Tab Buttons, Variant Tab Buttons and  Function Code End

    // Select Plan Final Button Function Code Sart

    function updateBoxProdInfo(activeProdId, selectedVariantId, availabelSelection, pricePerMeal, mealBoxCollection, mealBoxAddOnsCollection) {
        var boxProdInfo = JSON.parse(localStorage.getItem("boxProdInfo")) || [];
        var freshValues = {
            "activeProdId": activeProdId,
            "selectedVariantId": selectedVariantId,
            "availabelSelection": availabelSelection,
            "mealBoxCollection": mealBoxCollection,
            "mealBoxAddOnsCollection": mealBoxAddOnsCollection,
            "pricePerMeal": pricePerMeal,
        };
        boxProdInfo = [];
        boxProdInfo.push(freshValues);
        localStorage.setItem("boxProdInfo", JSON.stringify(boxProdInfo));
    }

    function loadBoxProdInfoAndUpdateLinks() {
        var storedBoxProdInfo = localStorage.getItem("boxProdInfo");
        if (storedBoxProdInfo && storedBoxProdInfo.trim() !== "" && storedBoxProdInfo.trim() !== "[]" && $(".customPurchaseFlowSec").length > 0) {
            var boxProdInfoArray = JSON.parse(storedBoxProdInfo);
            if (boxProdInfoArray && boxProdInfoArray.length > 0) {
                boxProdInfoArray.forEach(function (item, index) {
                    var activeProdId = item.activeProdId;
                    var selectedVariantId = item.selectedVariantId;
                    var availabelSelection = item.availabelSelection;
                    var mealBoxCollectionUrl = item.mealBoxCollection;
                    var addOnsCollectionURL = item.mealBoxAddOnsCollection;
                    var pricePerMeal = item.pricePerMeal;
                    if (activeProdId || selectedVariantId || availabelSelection || pricePerMeal || mealBoxCollectionUrl || addOnsCollectionURL) {

                        console.log("Active Product ID: " + activeProdId);
                        console.log("Selected Variant ID: " + selectedVariantId);
                        console.log("Available Selection: " + availabelSelection);
                        console.log("Meal Box Collection: " + addOnsCollectionURL);
                        console.log("Meal Box Add-Ons Collection: " + addOnsCollectionURL);
                        console.log("Meal Box Add-Ons Price Per Meal: " + pricePerMeal);

                        if ($("#continueToMeals").length > 0) {
                            $("#continueToMeals").attr('href', mealBoxCollectionUrl);
                        }
                        if ($(".submissionRedirectInput").length > 0) {
                            $(".submissionRedirectInput").val(mealBoxCollectionUrl);
                        }
                    }
                });
            }
        }
    }

    loadBoxProdInfoAndUpdateLinks();

    $("button.selectThisPlanBtn").click(function () {
        var storedPreferences = localStorage.getItem("preferences");
        if (storedPreferences && storedPreferences.trim() !== "" && storedPreferences.trim() !== "[]") {
            var activeProdBoxButton = $(".prodBoxMainSelector.active");
            var activeProdTabContent = $(activeProdBoxButton).attr("data-tabId");
            var activeProdId = $(activeProdBoxButton).attr("data-product").trim();
            var mealBoxCollection = $(activeProdBoxButton).attr("data-mealCollection").trim();
            var mealBoxAddOnsCollection = $(activeProdBoxButton).attr("data-addOnsCollection").trim();
            var activeProdActiveVariant = $(activeProdTabContent).find(".variantBtn.active");
            var selectedVariantId = $(activeProdActiveVariant).attr("data-variant").trim();
            var availabelSelection = $(activeProdActiveVariant).text().trim();
            var pricePerMeal = $(activeProdActiveVariant).attr("data-pricepermeal").trim();

            updateBoxProdInfo(activeProdId, selectedVariantId, availabelSelection, pricePerMeal, mealBoxCollection, mealBoxAddOnsCollection);
            $(".loadingIcon").show();
            $("body").addClass("showSecondStep");
            $(".purchaseFlowStep1").hide();
            updatePrefrencesField();
            setTimeout(function () {
                $(".loadingIcon").hide();
                $(".purchaseFlowNav button:nth-child(2)").addClass("active");
                $(".purchaseFlowStep2").fadeIn(200);
                loadBoxProdInfoAndUpdateLinks();
            }.bind(this), 600);
        }
        else {
            $(this).addClass("animated bounceIn")
            $("button.prefrenceBtn").addClass("showError animated bounceIn");
            $("body").removeClass("showSecondStep");
            $(".purchaseFlowStep1").show();
            setTimeout(function () {
                $(this).removeClass("animated bounceIn");
                $("button.prefrenceBtn").removeClass("showError animated bounceIn");
            }.bind(this), 500);

        }
        localStorage.removeItem('cartData');
        localStorage.removeItem('cartAddOns');
    });

    // Select Plan Final Button Function Code end

    $("button.loginSingUpTabBtn").click(function () {
        $("button.loginSingUpTabBtn").removeClass("active");
        $(this).addClass("active");
        $(".customFormFieldsContainer").hide();
        var activeFormTab = $(this).attr("data-tab");
        $(activeFormTab).show();
    });


    /* =========== MEAL BOX AND CART  CODE START =========== */

    $(document).on('click', 'button.quickMealAddBtn', function () {
        var cartItemId = $(this).attr("data-cartItemId");
        var cartItemName = $(this).attr("data-productName");
        var cartItemImg = $(this).attr("data-productImg");
        var cartItemsVariants = $(this).attr("data-variantOptions");
        var numberOfUnits = parseInt($(this).attr("data-numberOfUnits").trim());        
        var extraProdMainProdId = $(this).attr("data-mainProdId");
        var cartItemQty = 1;
        var sameProdLength = 0;
        var repeateIt = true;
        var existingCartItem = $(".mainCartItemsList").find(`#${cartItemId}`);
        if (cartItemsVariants == undefined || cartItemsVariants == "") {
            repeateIt = false;
            var cartItemsVariants = " ";
        }
        else {
            repeateIt = true;
        }

        if (checkLimitOfItems("normal", numberOfUnits)) {
            $(this).addClass("adding");
            var pricePerMeal = getPricePerMeal(); // Retrieve price per meal from local storage
            setTimeout(function () {
                $(this).addClass("added");

                // we will check number of units if there are more than 1 then we will add required units to cart 

                if (numberOfUnits > 1) {
                    var existingItemLength = existingCartItem.length;
                    sameProdLength = existingItemLength + 1;
                    appendCartItem(cartItemId, sameProdLength, numberOfUnits, extraProdMainProdId, cartItemImg, cartItemName, cartItemsVariants, numberOfUnits, pricePerMeal);
                    updateTotalCartItems("normal");
                    attachedQtyBtnsEventListeners();
                    updateCartAndSave();
                    var extrAddOnsBtns = $(this).attr("data-AbleToAddId").split(",");
                    extrAddOnsBtns.forEach(function (id) {
                        var addOnBtnElement = $(id);
                        if (addOnBtnElement.length) {
                            addOnBtnElement.click(); // Trigger click event if element exists
                        } else {
                            console.log("");
                        }
                    });
                }
                else {
                    if (existingCartItem.length > 0 && repeateIt != true) {
                        incrementCartItem(existingCartItem);
                    } else {
                        var existingItemLength = existingCartItem.length;
                        sameProdLength = existingItemLength + 1;
                        appendCartItem(cartItemId, sameProdLength, numberOfUnits, extraProdMainProdId, cartItemImg, cartItemName, cartItemsVariants, cartItemQty, pricePerMeal);
                    }

                    attachedQtyBtnsEventListeners();
                    updateCartAndSave();
                    var extrAddOnsBtns = $(this).attr("data-AbleToAddId").split(",");
                    extrAddOnsBtns.forEach(function (id) {
                        var addOnBtnElement = $(id);
                        if (addOnBtnElement.length) {
                            addOnBtnElement.click(); // Trigger click event if element exists
                        } else {
                            console.log("");
                        }
                    });
                    $(this).attr("data-AbleToAddId", "")
                }



                // remove classes from Add To Cart Button
                setTimeout(function () {
                    $(this).removeClass("adding added");
                    $('.optionChooser').prop('checked', false);
                    $(".extraOptionOverlay.active").removeClass("active");
                    if ($(".extraQuickMeal").length > 0) {
                        $(".extraQuickMeal").removeClass("quickMealAddBtn").addClass("disabled");
                    }
                }.bind(this), 1500);

            }.bind(this), 900);
        }
    });

    $(document).on('click', 'button.removeAllCart', function () {

        $(".mainCartItemsList").empty();
        $(".addOnsList").empty();
        localStorage.removeItem('cartData');
        localStorage.removeItem('cartAddOns');
        $(".totalCartItems").text("0");
        $(".mobileTotalCart").text("0");
        $(".cartSubtotal, .orderTotalPrice").text("$0.00");
        $(".addOnHeader").hide();
        if ($(".mealBoxProgressBar").length > 0) {
            $(".mealBoxProgressBar").css("width", 0 + "%");
        }
        var boxCollectionUrl = getBoxCollectionUrl();
        var currentUrl = window.location.href;
        if (currentUrl.includes(boxCollectionUrl)) {
            return true;
        } else {
            window.location.href = boxCollectionUrl;
        }

    });

    $(document).on('click', 'button.addonStep', function () {
        $(".addOnHeader").hide();
        if (checkLimitOfItems("moveToAddOn")) {
            return true;
        }
        else {
            window.location.href = getAddOnCollectionUrl();
        }
    });

    $(document).on('click', 'button.ViewMealsBtn', function () {
        $("body").addClass("showCart");
    });
    $(document).on('click', 'button.cartCloseBtn', function () {
        $("body").removeClass("showCart");
    });


    function getSelectedVariant() {
        var storedBoxProdInfo = localStorage.getItem("boxProdInfo");
        var pricePerMeal = "";
        if (storedBoxProdInfo) {
            var boxProdInfoArray = JSON.parse(storedBoxProdInfo);
            boxProdInfoArray.forEach(function (item, index) {
                selectedVariantId = item.selectedVariantId;
            });
        }
        return selectedVariantId;
    }

    function getPricePerMeal() {
        var storedBoxProdInfo = localStorage.getItem("boxProdInfo");
        var pricePerMeal = "";
        if (storedBoxProdInfo) {
            var boxProdInfoArray = JSON.parse(storedBoxProdInfo);
            boxProdInfoArray.forEach(function (item, index) {
                pricePerMeal = item.pricePerMeal;
            });
        }
        return pricePerMeal;
    }

    function getTotalItemLimits() {
        var storedBoxProdInfo = localStorage.getItem("boxProdInfo");
        var availabelSelection = "";
        if (storedBoxProdInfo) {
            var boxProdInfoArray = JSON.parse(storedBoxProdInfo);
            boxProdInfoArray.forEach(function (item, index) {
                availabelSelection = item.availabelSelection;
            });
        }
        return availabelSelection;
    }

    function getAddOnCollectionUrl() {
        var storedBoxProdInfo = localStorage.getItem("boxProdInfo");
        var addOnCollectionUrl = "";
        if (storedBoxProdInfo) {
            var boxProdInfoArray = JSON.parse(storedBoxProdInfo);
            boxProdInfoArray.forEach(function (item, index) {
                addOnCollectionUrl = item.mealBoxAddOnsCollection;
            });
        }
        return addOnCollectionUrl;
    }

    function getBoxCollectionUrl() {
        var storedBoxProdInfo = localStorage.getItem("boxProdInfo");
        var mealBoxCollectionUrl = "";
        if (storedBoxProdInfo) {
            var boxProdInfoArray = JSON.parse(storedBoxProdInfo);
            boxProdInfoArray.forEach(function (item, index) {
                mealBoxCollectionUrl = item.mealBoxCollection;
            });
        }
        return mealBoxCollectionUrl;
    }

    function incrementCartItem(existingCartItem) {
        var currentQty = parseInt(existingCartItem.find("input.qtyField").val());
        existingCartItem.find("input.qtyField").val(currentQty + 1);
        updateTotalCartItems("normal");
    }

    function appendCartItem(cartItemId, sameProdLength, numberOfUnits, extraProdMainProdId, cartItemImg, cartItemName, cartItemsVariants, cartItemQty, pricePerMeal) {
        var itemHtml = $("#cartItemTemplate").html(); // Retrieve template from hidden container
        itemHtml = itemHtml.replace('%cartItemId%', cartItemId)
            .replace('%cartItemImg%', cartItemImg)
            .replace('%cartItemName%', cartItemName)
            .replace('%extraProdMainProdId%', extraProdMainProdId)
            .replace('%cartItemsVariants%', cartItemsVariants)
            .replace('%cartItemQtyData%', cartItemQty)
            .replace('%cartItemQty%', cartItemQty)
            .replace('%numberOfUnits%', numberOfUnits)
            .replace('%cartItemPrice%', pricePerMeal);
        var $appendedItem = $(itemHtml); // Convert to jQuery object

        // Set id for the button with class "qtyMinus"
        if (sameProdLength != 0) {
            $appendedItem.find('.qtyMinus').attr('id', `qtyMinus-${extraProdMainProdId}-${sameProdLength}`);
            $appendedItem.find('.qtyPlus').attr('id', `qtyPlus-${extraProdMainProdId}-${sameProdLength}`).addClass(`plusBtn-${extraProdMainProdId}`);
        }
        $(".mainCartItemsList").append($appendedItem);
        updateTotalCartItems("normal");
    }

    function attachedQtyBtnsEventListeners() {
        $(".mainCartItemsList .qtyPlus").off("click").on("click", function () {
            var needtoAddUnits = parseInt($(this).parent(".qtyBox").next("span.numberOfUnits").text().trim());
            var currentTotalCartItems = parseInt($(".totalCartItems").text().trim());
            var limitOfSelection = parseInt(getTotalItemLimits());
            var afterAddingTotalItems = needtoAddUnits + currentTotalCartItems; 
            if (afterAddingTotalItems > limitOfSelection) {
                alert(`You can't add more than ${limitOfSelection} items to this box.`)
            }
            else {
                if (checkLimitOfItems("normal")) {
                    var inputField = $(this).siblings("input.qtyField");
                    var currentQty = parseInt(inputField.val());
                    inputField.val(currentQty + needtoAddUnits);
                    var buttonId = $(this).attr('id');
                    var dataLinkQtyBtn = $('[data-linkqtybtn="' + buttonId + '"]'); 
                    if (dataLinkQtyBtn.length) {
                        dataLinkQtyBtn.trigger('click');
                    }
                    updateTotalCartItems("normal");
                    updateCartAndSave(); // Update cart data in local storage
                }
            }

        });

        $(".mainCartItemsList .qtyMinus").off("click").on("click", function () {
            var needtoRemoveUnits = parseInt($(this).parent(".qtyBox").next("span.numberOfUnits").text().trim());
            var inputField = $(this).siblings("input.qtyField");
            var currentQty = parseInt(inputField.val());
            if (currentQty > 1) {
                inputField.val(currentQty - needtoRemoveUnits);
                if (currentQty - needtoRemoveUnits < 1) {
                    $(this).closest(".customCartItem").remove();
                }
            } else {
                $(this).closest(".customCartItem").remove();
            }
            var buttonId = $(this).attr('id');
            var dataLinkQtyBtn = $('[data-linkqtybtn="' + buttonId + '"]'); 
            if (dataLinkQtyBtn.length) {
                dataLinkQtyBtn.trigger('click');
            }
            updateTotalCartItems("normal");
            updateCartAndSave();
        });
    }

    function updateTotalCartItems(prodType) {
        var totalItems = 0;
        $(".mainCartItemsList .customCartItem").each(function () {
            var quantity = parseInt($(this).find("input.qtyField").val());
            totalItems += quantity;
        });
        if (prodType == "isAddOn") {
            var totalAddOnItems = 0;
            $(".addOnsList .customCartItem").each(function () {
                var addOnQuantity = parseInt($(this).find("input.qtyField").val());
                totalAddOnItems += addOnQuantity;
            });
            $(".totalAddOnItems").text(totalAddOnItems);
            $(".addOnHeader").show();
        }
        else {
            $(".totalCartItems").text(totalItems);
            $(".mobileTotalCart").text(totalItems);
        }
        updatCartFooterTotal();
    }

    function updatCartFooterTotal() {
        var totalPrice = 0;
        $(".customCartContainer .customCartItem").each(function () {
            var quantity = parseInt($(this).find("input.qtyField").val());
            var price = parseFloat($(this).find(".cartItemPrice").text().replace("$", ""));
            totalPrice += quantity * price; // Multiply price by quantity
        });

        // Update the subt total price in the footer
        $(".cartSubtotal").text("$" + totalPrice.toFixed(2));
        // update cart Ordar total prcie in footer 
        var cartSubtotal = parseFloat($(".cartSubtotal").text().replace("$", ""));
        var estimatedTax = parseFloat($(".estimatedTax").text().replace("$", ""));
        var cartShippingCharges = 0;
        if ($(".shippingCharges").text() != "FREE") {
            cartShippingCharges = parseFloat($(".shippingCharges").text.replace("$", ""));
        }
        var finalOrdatTotal = cartSubtotal + estimatedTax + cartShippingCharges;
        $(".orderTotalPrice").text("$" + finalOrdatTotal.toFixed(2));

    }

    function checkLimitOfItems(warningType, numberOfUnits = 1) {
        var limitOfSelection = getTotalItemLimits();
        var maxLimitForCartItems = parseInt(limitOfSelection);
        var totalCartItemsAdded = parseInt($(".totalCartItems").text());

        if (numberOfUnits > 1) {
            if (numberOfUnits + totalCartItemsAdded > maxLimitForCartItems) {
                if (warningType != "moveToAddOn") {
                    alert(`You can't add more than ${maxLimitForCartItems} items to this box.`);
                }
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (maxLimitForCartItems > totalCartItemsAdded) {
                if (warningType == "moveToAddOn") {
                    alert(`Please add ${maxLimitForCartItems - totalCartItemsAdded} more meal items to continue.`);
                }
                return true;
            }
            else {
                if (warningType != "moveToAddOn") {
                    alert(`You can't add more than ${maxLimitForCartItems} items to this box.`);
                }
                return false;
            }
        }



    }

    // save cart in local storage and load cart data from local storage code start
    function updateCartAndSave() {
        var cartData = [];
        $(".mainCartItemsList .customCartItem").each(function () {
            var cartItemId = $(this).attr("id");
            var cartItemImg = $(this).find("img").attr("src");
            var cartItemName = $(this).find(".itemName").text();            
            var extraProdMainProdId = $(this).attr("data-extraProdMainProdId");
            var numberOfUnitsForItem = parseInt($(this).find(".numberOfUnits").text().trim());
            if ($(this).find(".cartItemsInfo").text() != undefined || (this).find(".cartItemsInfo").text() != "") {
                var cartItemsVariants = $(this).find(".cartItemsInfo").text();
            }
            else {
                var cartItemsVariants = " ";
            }
            var cartItemQty = parseInt($(this).find("input.qtyField").val());
            var cartItemPrice = parseFloat($(this).find(".cartItemPrice").text().replace("$", ""));
            cartData.push({
                cartItemId: cartItemId,
                cartItemImg: cartItemImg,                
                extraProdMainProdId: extraProdMainProdId,
                cartItemName: cartItemName,
                cartItemsVariants: cartItemsVariants,
                numberOfUnitsForItem: numberOfUnitsForItem,
                cartItemQty: cartItemQty,
                cartItemPrice: cartItemPrice
            });
        });
        // Save the cart data to local storage
        localStorage.setItem('cartData', JSON.stringify(cartData));
        if ($(".mealBoxProgressBar").length > 0) {
            var limitOfItems = parseInt(getTotalItemLimits());
            var totalAddedItems = parseInt($(".totalCartItems").text().trim());
            var finalProgress = totalAddedItems * 100 / limitOfItems;
            $(".mealBoxProgressBar").css("width", finalProgress + "%");
        }
    }

    function loadCartData() {
        var cartData = localStorage.getItem('cartData');
        if (cartData) {
            cartData = JSON.parse(cartData);
            cartData.forEach(function (item) {
                appendCartItem(item.cartItemId, 1, item.numberOfUnitsForItem, item.extraProdMainProdId, item.cartItemImg, item.cartItemName, item.cartItemsVariants, item.cartItemQty, item.cartItemPrice);
            });
            updateTotalCartItems("normal");
            attachedQtyBtnsEventListeners();
        }
    }

    if ($("#cartItemTemplate").length > 0) {
        loadCartData();
        loadAddOnsCartData();
        if ($(".mealBoxProgressBar").length > 0) {
            var limitOfItems = parseInt(getTotalItemLimits());
            var totalAddedItems = parseInt($(".totalCartItems").text().trim());
            var finalProgress = totalAddedItems * 100 / limitOfItems;
            $(".mealBoxProgressBar").css("width", finalProgress + "%");
        }
    };
    // save cart in local storage and load cart data from local storage code end


    //  ========  ADD ONS ADD TO CART CODE START ======== 
    $(document).on('click', 'button.quickAddOnsBtn', function () {
        var cartItemId = $(this).attr("data-cartItemId");
        var addOnVariantId = $(this).attr("data-addOnVariantId");
        var extraProdMainProdId = $(this).attr("data-mainProdId");
        var cartItemName = $(this).attr("data-productName");
        var cartItemImg = $(this).attr("data-productImg");
        var addOnPrice = $(this).attr("data-AddOnPrice");
        var numberOfUnits = parseInt($(this).attr("data-numberOfUnits").trim());
        var cartItemQty = 1;
        var sameProdLength = 0;
        var existingAddOnCartItem = $(".addOnsList").find(`#${cartItemId}`);
        var checkPlusBtnLenght = $(`.plusBtn-${extraProdMainProdId}`).length;
        var linkedProd = $(this).attr("data-linkedProd");

        $(this).addClass("adding");
        setTimeout(function () {
            $(this).addClass("added");

            if (numberOfUnits > 1) {
                var existingAddOnItemLength = existingAddOnCartItem.length;
                sameProdLength = checkPlusBtnLenght;
                appendCartAddOnItem(cartItemId, sameProdLength, numberOfUnits, addOnVariantId, extraProdMainProdId, cartItemImg, cartItemName, numberOfUnits, addOnPrice, linkedProd);
                attachedAddOnQtyBtnsEventListeners();
                updateCartAddonsAndSave();                
            }
            else {
                if (existingAddOnCartItem.length > 0) {
                    incrementAddOnCartItem(existingAddOnCartItem);
                } else {
                    var existingAddOnItemLength = existingAddOnCartItem.length;
                    sameProdLength = checkPlusBtnLenght;
                    appendCartAddOnItem(cartItemId, sameProdLength, numberOfUnits, addOnVariantId, extraProdMainProdId, cartItemImg, cartItemName, cartItemQty, addOnPrice, linkedProd);
                }
                attachedAddOnQtyBtnsEventListeners();
                updateCartAddonsAndSave();                
            }
            // remove classes from Add To Cart Button
            setTimeout(function () {
                $(this).removeClass("adding added");
            }.bind(this), 1500);

        }.bind(this), 900);
    });

    function incrementAddOnCartItem(existingAddOnCartItem) {
        var currentQty = parseInt(existingAddOnCartItem.find("input.qtyField").val());
        existingAddOnCartItem.find("input.qtyField").val(currentQty + 1);
        updateTotalCartItems("isAddOn");
    }

    function appendCartAddOnItem(cartItemId, sameProdLength, numberOfUnits, addOnVariantId, extraProdMainProdId, cartItemImg, cartItemName, cartItemQty, addOnPrice, linkedProd) {
        var itemHtml = $("#cartItemTemplate").html(); // Retrieve template from hidden container
        itemHtml = itemHtml.replace('%cartItemId%', cartItemId)
            .replace('%cartItemVariantId%', addOnVariantId)
            .replace('%cartItemImg%', cartItemImg)
            .replace('%cartItemName%', cartItemName)
            .replace('%extraProdMainProdId%', extraProdMainProdId)
            .replace('%cartItemQtyData%', cartItemQty)
            .replace('%cartItemQty%', cartItemQty)
            .replace('%numberOfUnits%', numberOfUnits)
            .replace('%cartItemPrice%', addOnPrice)
            .replace('%isLinkedProd%', linkedProd);
            var $appendedItem = $(itemHtml); 
        if (sameProdLength != 0) {
            $appendedItem.find('.qtyMinus').attr('data-linkQtyBtn', `qtyMinus-${extraProdMainProdId}-${sameProdLength}`);
            $appendedItem.find('.qtyPlus').attr('data-linkQtyBtn', `qtyPlus-${extraProdMainProdId}-${sameProdLength}`);
        }
        if(linkedProd == "true"){
            $appendedItem.find('.qtyMinus').hide();
            $appendedItem.find('.qtyPlus').hide();
        }
        $(".addOnsList").append($appendedItem);       
        updateTotalCartItems("isAddOn");
       
    }

    function attachedAddOnQtyBtnsEventListeners() {
        $(".addOnsList .qtyPlus").off("click").on("click", function () {
            var needtoAddUnits = parseInt($(this).parent(".qtyBox").next("span.numberOfUnits").text().trim());
            var inputField = $(this).siblings("input.qtyField");
            var currentQty = parseInt(inputField.val());
            inputField.val(currentQty + needtoAddUnits);
            updateTotalCartItems("isAddOn");
            updateCartAddonsAndSave(); // Update cart data in local storage
        });

        $(".addOnsList .qtyMinus").off("click").on("click", function () {
            var needtoRemoveUnits = parseInt($(this).parent(".qtyBox").next("span.numberOfUnits").text().trim());
            var inputField = $(this).siblings("input.qtyField");
            var currentQty = parseInt(inputField.val());
            if (currentQty > 1) {
                inputField.val(currentQty - needtoRemoveUnits);
                if (currentQty - needtoRemoveUnits < 1) {
                    $(this).closest(".customCartItem").remove();
                }
            } else {
                $(this).closest(".customCartItem").remove();
            }
            updateTotalCartItems("isAddOn");
            updateCartAddonsAndSave();
        });
    }

    function updateCartAddonsAndSave() {
        var cartAddOns = [];
        $(".addOnsList .customCartItem").each(function () {
            var cartItemId = $(this).attr("id");
            var addOnVariantId = $(this).attr("data-VariantId");
            var extraProdMainProdId = $(this).attr("data-extraProdMainProdId");
            var cartItemImg = $(this).find("img").attr("src");
            var cartItemName = $(this).find(".itemName").text();
            var cartItemQty = parseInt($(this).find("input.qtyField").val());
            var cartItemPrice = parseFloat($(this).find(".cartItemPrice").text().replace("$", ""));
            var numberOfUnitsForItem = parseInt($(this).find(".numberOfUnits").text().trim());
            var isLinkedProd = $(this).attr("data-linkedProd").trim();
            cartAddOns.push({
                cartItemId: cartItemId,
                addOnVariantId: addOnVariantId,
                extraProdMainProdId: extraProdMainProdId,
                cartItemImg: cartItemImg,
                cartItemName: cartItemName,
                cartItemQty: cartItemQty,
                numberOfUnitsForItem: numberOfUnitsForItem,
                cartItemPrice: cartItemPrice,
                isLinkedProd: isLinkedProd
            });
        });

        // Save the cart data to local storage
        localStorage.setItem('cartAddOns', JSON.stringify(cartAddOns));
    }

    function loadAddOnsCartData() {
        var cartAddOns = localStorage.getItem('cartAddOns');
        if (cartAddOns) {
            cartAddOns = JSON.parse(cartAddOns);
            cartAddOns.forEach(function (item) {
                appendCartAddOnItem(item.cartItemId, 1, item.numberOfUnitsForItem, item.addOnVariantId, item.extraProdMainProdId, item.cartItemImg, item.cartItemName, item.cartItemQty, item.cartItemPrice, item.isLinkedProd);
            });
            updateTotalCartItems("isAddOn");
            attachedAddOnQtyBtnsEventListeners();
        }
    }

    //  ========  ADD ONS ADD TO CART CODE END ======== 

    $(document).on('click', 'button.optionsOverlayOpener', function () {
        $('.optionChooser').prop('checked', false);
        if ($(".extraQuickMeal").length > 0) {
            $(".extraQuickMeal").removeClass("quickMealAddBtn").addClass("disabled");
        }
        $(".extraOptionOverlay").removeClass("active");
        var optionOverlay = $(this).attr("data-showOptions");
        $(optionOverlay).addClass("active");
    });
    $(document).on('click', 'button.closeOptionOverlay', function () {
        $(".extraOptionOverlay").removeClass("active");
        $('.optionChooser').prop('checked', false);
        if ($(".extraQuickMeal").length > 0) {
            $(".extraQuickMeal").removeClass("quickMealAddBtn").addClass("disabled");
        }
    });
    $(document).on('change', '.extraProdVariantContainer .optionChooser', function () {

        var allGroupsChecked = true;
        var itsParentVariantContainer = $(this).attr("data-ParentContainer")

        $(itsParentVariantContainer).each(function () {
            if (!$(this).find('.optionChooser:checked').length) {
                allGroupsChecked = false;
                return false; // Exit the loop early
            }
        });
        if (allGroupsChecked) {
            $(this).closest('.extraOptionOverlay').find(".customQuickAdd").addClass("quickMealAddBtn").removeClass("disabled");
        }
        else {
            $(this).closest('.extraOptionOverlay').find(".customQuickAdd").removeClass("quickMealAddBtn").addClass("disabled");
        }

        var allOptions = [];
        var extraAddOnProd = [];
        $(this).closest('.extraOptionOverlay').find('.optionChooser:checked').each(function () {
            allOptions.push($(this).val());
        });
        $(this).closest('.extraOptionOverlay').find('.optionChooser:checked').each(function () {
            extraAddOnProd.push($(this).attr("data-VariantProdAddBtn").trim());
        });

        $(this).closest('.extraOptionOverlay').find(".quickMealAddBtn").attr("data-variantoptions", allOptions.join(", "));
        $(this).closest('.extraOptionOverlay').find(".quickMealAddBtn").attr("data-AbleToAddId", extraAddOnProd.join(", "));

    });
    $(document).on('click', 'button.customQuickAdd.extraQuickMeal.button.disabled', function () {
        $(this).addClass("animated bounceIn");
        $(".extrProdInfoContainer").addClass("showError animated bounceIn");
        setTimeout(function () {
            $(this).removeClass("animated bounceIn");
            $(".extrProdInfoContainer").removeClass("showError animated bounceIn");
        }.bind(this), 900);
    });

    $(document).on('click', 'label.hiddenAddOnLabel', function () {
        $(this).parent(".extraProdVariantContainer").children(".hiddenBtn").removeClass("ableToAddHidden");
        var radioIsChecked = false;
        if ($(this).children("input").is(':checked')) {
            radioIsChecked = true;
        }
        var hiddenAddOnBtn = $(this).attr("data-VarianHiddenBtn");
        if (hiddenAddOnBtn.length > 0 && radioIsChecked) {
            $(hiddenAddOnBtn).addClass("ableToAddHidden");
        }
    });

    /* =========== MEAL BOX AND CART  CODE END =========== */


    // =========== FINAL ADD TO CART BUTTON CODE START =========== 

    $(document).on('click', '.finalAddToCartBtn', function (e) {

        var limitOfSelection = getTotalItemLimits();
        var maxLimitForCartItems = parseInt(limitOfSelection);
        var totalCartItemsAdded = parseInt($(".totalCartItems").text());
        if (totalCartItemsAdded < maxLimitForCartItems) {
            alert(`Please add ${maxLimitForCartItems - totalCartItemsAdded} more meal items to continue.`);
        }
        else {
            var finalProdForCart = [];

            var storedMainProdBox = localStorage.getItem("boxProdInfo");
            var mainBoxProdInfoArray = JSON.parse(storedMainProdBox);

            var storedCartAddOns = localStorage.getItem("cartAddOns");
            if (storedCartAddOns) {
                var storedCartAddOnsInfoArray = JSON.parse(storedCartAddOns);
            }

            // lineItems properties 
            // Get cartData from localStorage

            var cartData = localStorage.getItem("cartData");
            var cartItemsArray = JSON.parse(cartData);

            var formattedCartBoxItems = cartItemsArray.map(function (item) {
                return {
                    cartItemName: item.cartItemName,
                    cartItemsVariants: item.cartItemsVariants,
                    cartItemQty: item.cartItemQty,
                };
            });

            var finalBoxItemsProd = formattedCartBoxItems.map(function (item) {
                var cartItemsVariantsTrimmed = item.cartItemsVariants.trim(); // Remove leading and trailing whitespace
                if (cartItemsVariantsTrimmed) {
                    return `[${item.cartItemName} (${item.cartItemsVariants}) x ${item.cartItemQty}]`;
                } else {
                    return `[${item.cartItemName} x ${item.cartItemQty}]`;
                }
            }).filter(function (item) {
                return item.trim() !== ""; // Filter out empty items
            }).join('\n');

            $("#boxItems").val(finalBoxItemsProd);
            // pushing mainBox Prod Info for Add To Cart
            // mainBoxProdInfoArray.forEach(function (item, index) {
            //     finalProdForCart.push({
            //         id: item.selectedVariantId,
            //         quantity: 1,
            //         properties: {
            //             "Box Items": finalBoxItemsProd, // Example property from mainBoxProdInfoArray
            //             // Include more properties as needed
            //         }
            //     });
            // });


            // pushing Cart Addon Info for Add To Cart
            if (storedCartAddOnsInfoArray && storedCartAddOnsInfoArray.length > 0) {
                storedCartAddOnsInfoArray.forEach(function (item, index) {
                    finalProdForCart.push({
                        id: item.addOnVariantId, quantity: item.cartItemQty
                    });
                });
            }

            $(".needToAddVariant").val(getSelectedVariant());

            console.log(finalProdForCart);
            if (finalProdForCart.length > 0) {
                $.ajax({
                    type: "POST",
                    url: "/cart/add.js",
                    data: { items: finalProdForCart },
                    dataType: "json",
                    success: function () {
                        localStorage.removeItem('cartData');
                        localStorage.removeItem('cartAddOns');
                        setTimeout(function () {
                            $(".finalAddBtn").click();
                            // window.location.href = "/cart";
                        }, 200);
                    },
                    error: function () {
                        alert("Please Try Again..")
                        console.log("ERROR");
                    }
                });
            }
            else {
                localStorage.removeItem('cartData');
                localStorage.removeItem('cartAddOns');
                $(".finalAddBtn").click();

            }
        }

    });

    // =========== FINAL ADD TO CART BUTTON CODE START ===========




    /* =========== PURCHASE FLOW  CODE END =========== */
});