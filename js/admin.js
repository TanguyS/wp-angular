(function() {
  jQuery(document).ready(function($) {
    var customizeMain, loadPageParts, showNouveautes, showSurLeWeb, showThematics;
    showNouveautes = function(show) {
      if (show == null) {
        show = true;
      }
      if (show) {
        $("#customize-control-sgdf_nouveautes_cat").show();
      } else {
        $("#customize-control-sgdf_nouveautes_cat").hide();
      }
    };
    showSurLeWeb = function(show) {
      if (show == null) {
        show = true;
      }
      if (show) {
        $("#customize-control-sgdf_surleweb_cat").show();
      } else {
        $("#customize-control-sgdf_surleweb_cat").hide();
      }
    };
    showThematics = function(show) {
      if (show == null) {
        show = true;
      }
      if (show) {
        $("#customize-control-sgdf_thematics_0").show();
        $("#customize-control-sgdf_thematics_1").show();
        $("#customize-control-sgdf_thematics_2").show();
      } else {
        $("#customize-control-sgdf_thematics_0").hide();
        $("#customize-control-sgdf_thematics_1").hide();
        $("#customize-control-sgdf_thematics_2").hide();
      }
    };
    if ($("body.wp-customizer").length > 0) {
      $(document).on("click", "#accordion-section-sgdf_customizer_section_configuration", function() {
        customizeMain();
      });
    }
    customizeMain = function() {
      showNouveautes($("#customize-control-sgdf_nouveautes input").prop('checked'));
      $("#customize-control-sgdf_nouveautes input").on("change", function() {
        showNouveautes($("#customize-control-sgdf_nouveautes input").prop('checked'));
      });
      showSurLeWeb($("#customize-control-sgdf_surleweb input").prop('checked'));
      $("#customize-control-sgdf_surleweb input").on("change", function() {
        showSurLeWeb($("#customize-control-sgdf_surleweb input").prop('checked'));
      });
      showThematics($("#customize-control-sgdf_thematics input").prop('checked'));
      $("#customize-control-sgdf_thematics input").on("change", function() {
        showSurLeWeb($("#customize-control-sgdf_thematics input").prop('checked'));
      });
    };
    loadPageParts = function() {
      var $selectors, template;
      template = $("#page_template option:selected").val();
      $selectors = $("#section-thematics-page, #section-regular");
      $selectors.hide();
      if (template === "medias.php" || template === "aventure.php") {
        return $("#section-thematics-page").show();
      } else {
        return $("#section-regular").show();
      }
    };
    if ($("#page_template").length > 0) {
      loadPageParts();
      $("#page_template").change(function() {
        loadPageParts();
      });
      return;
    }
  });

}).call(this);
