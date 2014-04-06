/**
 * Show by DLC:
 *  - buttons for showing only assignments/weapons/awards/weapon unlocks from selected DLC/base game
 *
 * @author dapil
 * @version 1.1
 * @url http://dapil.github.io/show-by-dlc-bblog/show-by-dlc.js
 * @last-edit 6. 4. 2014 18:15
 */
BBLog.handle("add.plugin",
{
    id: "show-by-dlc",
    name: "Show by DLC",

    configFlags: [
        ["option.xp1", 1], //China Rising
        ["option.xp2", 1], //Second Assault
        ["option.xp3", 0], //Naval Strike
        ["option.xp4", 0], //Dragon's Teeth
        ["option.xp5", 0], //Final Stand
        ["option.hidebuttons", 0]
    ],

    translations:
    {
        "en":
        {
            "option.xp1": "China Rising",
            "option.xp2": "Second Assault",
            "option.xp3": "Naval Strike",
            "option.xp4": "Dragon's Teeth",
            "option.xp5": "Final Stand",
            "all": "All",
            "basegame": "Base game",
            "option.hidebuttons": "Add buttons for hiding uncompleted/locked or completed/unlocked items"
        },
        "cs":
        {
            "all": "Všechny",
            "basegame": "Základní hra",
        },
        "pt":
        {
            "all": "Tudo",
            "basegame": "Jogo Base",
        },
        "de":
        {
            "all": "Alle",
            "basegame": "Basisspiel",
        },
    },

    init: function (instance)
    {
        instance.AddDLCMenu(instance);
    },

    domchange: function (instance)
    {
        instance.AddDLCMenu(instance);
    },

    AddDLCMenu: function (instance)
    {
        if (!$(".sbd-menu").length)
        {
            var url = window.location.href;
            var pages = ["/assignments/", "/weaponunlocks/", "/awards/", "/weapons/"];
            var parentelements = ["assignments-list", "weapon-stats-list", "awards-list", "weapons-stat-tbl tbody"];
            var xpmenuids = [1,0,2,3,4];
            var activehidebutton;
            for (var i = 0; i < 4; i++)
            {
                if (url.indexOf(pages[i]) != -1)
                {
                    var parentelement = parentelements[i];
                    var dlcmenucode;
                    if (instance.storage("option.xp1") && instance.storage("option.xp2") && instance.storage("option.xp3") && instance.storage("option.xp4") && instance.storage("option.xp5"))
                    {
                        dlcmenucode = '<ul class="sbd-menu"><li style="width: 0.8%" class="sbd sbd-all active"><a>' + instance.t("all") + '</a></li><li class="sbd sbd-base" style="width: 1.2%"><a>' + instance.t("basegame") + '</a></li><li class="sbd" data-xpmenu="1" style="width: 1.2%"><a>China Rising</a></li><li class="sbd" data-xpmenu="0" style="width: 1.4%"><a>Second Assault</a></li><li class="sbd" data-xpmenu="2" style="width: 1.2%"><a>Naval Strike</a></li><li class="sbd" data-xpmenu="3" style="width: 1.3%"><a>Dragon\'s Teeth</a></li><li class="sbd" data-xpmenu="4" style="width: 1.2%"><a>Final Stand</a></li></ul>';
                    }
                    else
                    {
                        dlcmenucode = '<ul class="sbd-menu"><li style="width: 0.8%" class="sbd sbd-all active"><a>' + instance.t("all") + '</a></li><li class="sbd sbd-base"><a>' + instance.t("basegame") + '</a></li>';
                        for (var xpmenu = 1; xpmenu < 6; xpmenu++)
                        {
                            if (instance.storage("option.xp" + xpmenu))
                            {
                                var xpmenuid = xpmenuids[xpmenu - 1]
                                dlcmenucode += '<li class="sbd" data-xpmenu="' + xpmenuid + '"><a>' + instance.t("option.xp" + xpmenu) + '</a></li>';
                            }
                        }
                        dlcmenucode += '</ul>';
                    }
                    if(instance.storage("option.hidebuttons"))
                    {
                        dlcmenucode += '<ul class="sbd-hb-menu"><li style="width: 0.8%" class="sbd sbd-hb sbd-hb-all active"><a>All</a></li><li class="sbd sbd-hb sbd-uncompleted"><a>Uncompleted/locked</a></li><li class="sbd sbd-hb sbd-completed"><a>Completed/unlocked</a></li></ul>';
                    }
                    $(".submenu.margin-top").append(dlcmenucode);
                }
            }
        }       
        $(".sbd").click(function ()
        {
            $("#bn-show-all").click();
            $(".sbd.active").removeClass("active");
            if (!$(this).hasClass("sbd-hb"))
            {
            $(this).addClass("active");
            }            
            if ($(this).hasClass("sbd-all"))
            {
                $("." + parentelement + "> *").show();
            }
            if ($(this).hasClass("sbd-base"))
            {
                $("." + parentelement + " > *").hide();
                $("." + parentelement + " > *").not(":has(.xp-icon)").show();
            }
            if ($(this).data("xpmenu") != undefined)
            {
                $("." + parentelement + " > *").hide();
                $("." + parentelement + " > *").has(".xp-icon[data-xpack='xp" + $(this).data("xpmenu") + "']").show();
            }
            if(instance.storage("option.hidebuttons"))
            {
              if($(this).hasClass("sbd-uncompleted") || activehidebutton == 1)
              {
                $(".sbd-uncompleted").addClass("active");
                $(".sbd-hb-hidden").show().removeClass("sbd-hb-hidden");
                $("." + parentelement + "> *").not(".completed").addClass("sbd-hb-hidden").hide();
                $("." + parentelement + "> *").not(".locked").addClass("sbd-hb-hidden").hide();
                $("." + parentelement + "> *").not(":has(.award-medal.nottaken)").addClass("sbd-hb-hidden").hide();
                activehidebutton = 1
              }
              if($(this).hasClass("sbd-completed") || activehidebutton == 2)
              {
                $(".sbd-completed").addClass("active");
                $(".sbd-hb-hidden").show().removeClass("sbd-hb-hidden");
                $("." + parentelement + "> .completed").addClass("sbd-hb-hidden").hide();
                $("." + parentelement + "> .locked").addClass("sbd-hb-hidden").hide();
                $("." + parentelement + "> *").has(".award-medal.nottaken").addClass("sbd-hb-hidden").hide();
                activehidebutton = 2;
              }
              if($(this).hasClass("sbd-hb-all"))
              {
                $(this).addClass("active");
                $(".sbd-hb-hidden").show().removeClass("sbd-hb-hidden");
                activehidebutton = 0;
              }
            }
        });
    },
});
