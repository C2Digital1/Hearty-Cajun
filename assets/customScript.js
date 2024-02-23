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

});