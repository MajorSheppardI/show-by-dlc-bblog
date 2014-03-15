/**
 * Show by DLC:
 *  - buttons for showing only assignments/weapons/awards/weapon unlocks from selected DLC/base game
 *
 * @author dapil
 * @version 2.0
 * @url http://dapil.github.io/show-by-dlc-bblog/show-by-dlc.js
 * @last-edit 19. 2. 2014 23:15
 */
BBLog.handle("add.plugin",
{
    id: "show-by-dlc",
    name: "Show by DLC",

    translations:
    {
        "en":
        {
            "xp0": "China Rising",
            "xp1": "Second Assault",
            "xp2": "Naval Strike",
            "xp3": "Dragon's Teeth",
            "xp4": "Final Stand",
            "all": "All",
            "basegame": "Base game",
        },
        "cs":
        {
            "all": "Všechny",
            "basegame": "Základní hra",
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
            for (var activepage = 0; activepage < 4; activepage++)
            {
                if (url.indexOf(pages[activepage]) != -1)
                {
                    var parentelement = parentelements[activepage];
                    var dlcswithitems = [false,false,false,false,false];
                    console.log(parentelement)
                    for (var activedlc = 0; activedlc < 5; activedlc++)
                    {
                        if($("." + parentelement + " > *").has(".xp-icon[data-xpack='xp" + xpmenuids[activedlc] + "']").length != -1)
                        {
                            dlcswithitems[activedlc] = true;
                        }
                    }
                    if (dlcswithitems[0] && dlcswithitems[1] && dlcswithitems[2] && dlcswithitems[3] && dlcswithitems[4])
                    {
                        var dlcmenucode = '<ul class="sbd-menu"><li style="width: 0.8%" class="sbd sbd-all active"><a>' + instance.t("all") + '</a></li><li class="sbd sbd-base" style="width: 1.2%"><a>' + instance.t("basegame") + '</a></li><li class="sbd" data-xpmenu="1" style="width: 1.2%"><a>China Rising</a></li><li class="sbd" data-xpmenu="0" style="width: 1.4%"><a>Second Assault</a></li><li class="sbd" data-xpmenu="2" style="width: 1.2%"><a>Naval Strike</a></li><li class="sbd" data-xpmenu="3" style="width: 1.3%"><a>Dragon\'s Teeth</a></li><li class="sbd" data-xpmenu="4" style="width: 1.2%"><a>Final Stand</a></li></ul>';
                    }
                    else
                    {
                        var dlcmenucode = '<ul class="sbd-menu"><li style="width: 0.8%" class="sbd sbd-all active"><a>' + instance.t("all") + '</a></li><li class="sbd sbd-base"><a>' + instance.t("basegame") + '</a></li>';
                        for (var xpmenu = 0; xpmenu < 5; xpmenu++)
                        {
                            if (dlcswithitems[xpmenu])
                            {
                                dlcmenucode += '<li class="sbd" data-xpmenu="' + xpmenuids[xpmenu] + '"><a>' + instance.t("xp" + xpmenu) + '</a></li>';
                            }
                        }
                        dlcmenucode += '</ul>';
                    }
                    $(".submenu.margin-top").append(dlcmenucode);

                    $(".sbd").click(function ()
                    {
                        $("#bn-show-all").click();
                        $(".sbd.active").removeClass("active");
                        $(this).addClass("active");
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
                    });
                    return;
                }
            }
        }
    },
});
