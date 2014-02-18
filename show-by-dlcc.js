/**
* Assignments by DLC:
*  - buttons for showing only assignments from selected DLC/base game
*
* @author dapil
* @version 1.1
* @url http://dapil.github.io/assignments-by-dlc-bblog/assignments-by-dlc.js
* @last-edit 11. 2. 2014 22:06
*/

BBLog.handle("add.plugin", {
  id : "show-by-dlc",
  name : "Show by DLC",
  
  configFlags : [
    ["option.xp1", 1], //China Rising
    ["option.xp0", 1], //Second Assault
    ["option.xp2", 0], //Naval Strike
    ["option.xp3", 0], //Dragon's Teeth
    ["option.xp4", 0], //Final Stand
  ],
    
  translations : {
     "en" : {
      "option.xp1" : "China Rising",
      "option.xp0" : "Second Assault",
      "option.xp2" : "Naval Strike",
      "option.xp3" : "Dragon's Teeth",
      "option.xp4" : "Final Stand",
      "all" : "All",
      "basegame" : "Base game",
     },
     "cs" : {
      "all" : "Všechny",
      "basegame" : "Základní hra",
     },
  },
    
  init : function(instance){
    if(!$(".abd-menu").length)
    {
    var url = window.location.href;
    var pages = ["assignments","weaponunlocks","awards","weapons"];
    for (var i=0;i<4;i++)
    { 
      if(url.indexOf("/" + pages[i] + "/") != -1)
      {  
        instance.AddDLCMenu(instance,pages[i]);
        return;
      }
    }
    }
  },

  domchange : function(instance){
    if(!$(".abd-menu").length)
    {
    var url = window.location.href;
    var pages = ["assignments","weaponunlocks","awards","weapons"];
    for (var i=0;i<4;i++)
    { 
      if(url.indexOf("/" + pages[i] + "/") != -1)
      {  
        instance.AddDLCMenu(instance,pages[i]);
        return;
      }
    }
    }
  },
  
  AddDLCMenu : function(instance,page){
      if(instance.AreAllDLCsSelected(instance))
      {
        var dlcmenucode = '<ul class="abd-menu"><li style="width: 0.8%" class="abd abd-all active"><a>' + instance.t("all") + '</a></li><li class="abd abd-base" style="width: 1.2%"><a>' + instance.t("basegame") + '</a></li>';
      }
      else
      {
         var dlcmenucode = '<ul class="abd-menu"><li style="width: 0.8%" class="abd abd-all active"><a>' + instance.t("all") + '</a></li><li class="abd abd-base"><a>' + instance.t("basegame") + '</a></li>';   
      }
      if (instance.storage("option.xp1")){
        if(instance.AreAllDLCsSelected(instance))
        {
          dlcmenucode += '<li class="abd abd-xp1" style="width: 1.2%"><a>China Rising</a></li>';
        }
        else
        {
          dlcmenucode += '<li class="abd abd-xp1"><a>China Rising</a></li>';
        }
      }
      if (instance.storage("option.xp0")){
        if(instance.AreAllDLCsSelected(instance))
        {
          dlcmenucode += '<li class="abd abd-xp0" style="width: 1.4%"><a>Second Assault</a></li>';
        }
        else
        {
          dlcmenucode += '<li class="abd abd-xp0""><a>Second Assault</a></li>';
        }
      }
      if (instance.storage("option.xp2")){
        if(instance.AreAllDLCsSelected(instance))
        {    
          dlcmenucode += '<li class="abd abd-xp2" style="width: 1.2%"><a>Naval Strike</a></li>';
        }
        else
        {
          dlcmenucode += '<li class="abd abd-xp2"><a>Naval Strike</a></li>';
        }
      }
      if (instance.storage("option.xp3")){
        if(instance.AreAllDLCsSelected(instance))
        {
          dlcmenucode += '<li class="abd abd-xp3" style="width: 1.3%"><a>Dragon\'s Teeth</a></li>';
        }
        else
        {
          dlcmenucode += '<li class="abd abd-xp3"><a>Dragon\'s Teeth</a></li>';
        }
      }
      if (instance.storage("option.xp4")){
        if(instance.AreAllDLCsSelected(instance))
        {    
          dlcmenucode += '<li class="abd abd-xp4" style="width: 1.2%"><a>Final Stand</a></li>';
        }
        else
        {
          dlcmenucode += '<li class="abd abd-xp4"><a>Final Stand</a></li>';
        }
      }
      dlcmenucode += '</ul>';
      $(".submenu.margin-top").append(dlcmenucode);
    if(page == "assignments")
    {
      var parentelement = "assignments-list";
    }
    if(page == "weaponunlocks")
    {
      var parentelement = "weapon-stats-list";
    }
    if(page == "awards")
    {
      var parentelement = "awards-list";
    }    
    $(".abd").click(function() {
      $(".abd.active").removeClass("active");
      $(this).addClass("active");
      if($(this).hasClass("abd-all"))
      {
        $("." + parentelement + "> li").show();
      }
      if($(this).hasClass("abd-base"))
      {
        $("." + parentelement + " > li").hide();
        $("." + parentelement + " > li").not(":has(.xp-icon)").show();
      }
      for(var xpclicked=0;xpclicked<5;xpclicked++)
      {
        if($(this).hasClass("abd-xp" + xpclicked))
        {
          $("." + parentelement + " > li").hide();
          $("." + parentelement + " > li").has(".xp-icon[data-xpack='xp" + xpclicked + "']").show();
        }
      }                                     
    });
    
  },
  
  AreAllDLCsSelected : function(instance){
    if(instance.storage("option.xp0") && instance.storage("option.xp1") && instance.storage("option.xp2") && instance.storage("option.xp3") && instance.storage("option.xp4"))
    {
      return true;
    }
    else
    {
      return false;
    }
  },
});
