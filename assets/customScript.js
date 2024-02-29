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

    $(".mobileMenuOpener").click(function () {
        $(".mobile-header").toggleClass("isOpen");
        $("body, html").toggleClass("hideScroll");
    });

    $('.customLoadMoreBtm').click(function () {
        var $thisBtn = $(this);
        $($thisBtn).addClass("is-loading");
        var $hiddenContainer = $(this).prev('.collectionItemsRow');
        setTimeout(function () {
            $($thisBtn).addClass("is-loading");
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
    
    $(".prodIngPopupOpener").click(function () {
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
        $('.checkboxItem input:checked').each(function () {
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

    $('.checkboxItem input').change(updateCartNote);
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

    function updateBoxProdInfo(activeProdId, selectedVariantId, availabelSelection, mealBoxCollection, mealBoxAddOnsCollection) {
        var boxProdInfo = JSON.parse(localStorage.getItem("boxProdInfo")) || [];
        var freshValues = {
            "activeProdId": activeProdId,
            "selectedVariantId": selectedVariantId,
            "availabelSelection": availabelSelection,
            "mealBoxCollection": mealBoxCollection,
            "mealBoxAddOnsCollection": mealBoxAddOnsCollection,
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
                    if (activeProdId || selectedVariantId || availabelSelection || mealBoxCollectionUrl || addOnsCollectionURL) {

                        console.log("Active Product ID: " + activeProdId);
                        console.log("Selected Variant ID: " + selectedVariantId);
                        console.log("Available Selection: " + availabelSelection);
                        console.log("Meal Box Collection: " + addOnsCollectionURL);
                        console.log("Meal Box Add-Ons Collection: " + addOnsCollectionURL);

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

            updateBoxProdInfo(activeProdId, selectedVariantId, availabelSelection, mealBoxCollection, mealBoxAddOnsCollection);
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
    });

    // Select Plan Final Button Function Code end

    $("button.loginSingUpTabBtn").click(function () {
        $("button.loginSingUpTabBtn").removeClass("active");
        $(this).addClass("active");
        $(".customFormFieldsContainer").hide();
        var activeFormTab = $(this).attr("data-tab"); 
        $(activeFormTab).show();
    });

    /* =========== PURCHASE FLOW  CODE END =========== */

});