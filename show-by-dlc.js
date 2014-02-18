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
  id : "assignments-by-dlc",
  name : "Assignments by DLC",
  
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
    var url = window.location.href;
    if(url.match(/\/assignments\//))
    {
      instance.AddAssignmentsMenu(instance);
    }
  },

  domchange : function(instance){
    var url = window.location.href;
    if(url.match(/\/assignments\//))
    {
      instance.AddAssignmentsMenu(instance);
    }
  },
  
  AddAssignmentsMenu : function(instance){
    if(!$(".abd-menu").length)
    {
      if(instance.AreAllDLCsSelected(instance))
      {
        var assignmentscode = '<ul class="abd-menu"><li style="width: 0.8%" class="abd abd-all active"><a>' + instance.t("all") + '</a></li><li class="abd abd-base" style="width: 1.2%"><a>' + instance.t("basegame") + '</a></li>';
      }
      else
      {
         var assignmentscode = '<ul class="abd-menu"><li style="width: 0.8%" class="abd abd-all active"><a>' + instance.t("all") + '</a></li><li class="abd abd-base"><a>' + instance.t("basegame") + '</a></li>';   
      }
      if (instance.storage("option.xp1")){
        if(instance.AreAllDLCsSelected(instance))
        {
          assignmentscode += '<li class="abd abd-xp1" style="width: 1.2%"><a>China Rising</a></li>';
        }
        else
        {
          assignmentscode += '<li class="abd abd-xp1"><a>China Rising</a></li>';
        }
      }
      if (instance.storage("option.xp0")){
        if(instance.AreAllDLCsSelected(instance))
        {
          assignmentscode += '<li class="abd abd-xp0" style="width: 1.4%"><a>Second Assault</a></li>';
        }
        else
        {
          assignmentscode += '<li class="abd abd-xp0""><a>Second Assault</a></li>';
        }
      }
      if (instance.storage("option.xp2")){
        if(instance.AreAllDLCsSelected(instance))
        {    
          assignmentscode += '<li class="abd abd-xp2" style="width: 1.2%"><a>Naval Strike</a></li>';
        }
        else
        {
          assignmentscode += '<li class="abd abd-xp2"><a>Naval Strike</a></li>';
        }
      }
      if (instance.storage("option.xp3")){
        if(instance.AreAllDLCsSelected(instance))
        {
          assignmentscode += '<li class="abd abd-xp3" style="width: 1.3%"><a>Dragon\'s Teeth</a></li>';
        }
        else
        {
          assignmentscode += '<li class="abd abd-xp3"><a>Dragon\'s Teeth</a></li>';
        }
      }
      if (instance.storage("option.xp4")){
        if(instance.AreAllDLCsSelected(instance))
        {    
          assignmentscode += '<li class="abd abd-xp4" style="width: 1.2%"><a>Final Stand</a></li>';
        }
        else
        {
          assignmentscode += '<li class="abd abd-xp4"><a>Final Stand</a></li>';
        }
      }
      assignmentscode += '</ul>';
      $(".submenu.margin-top").append(assignmentscode);
    }
    $(".abd").click(function() {
      $(".abd.active").removeClass("active");
      if($(this).hasClass("abd-all"))
      {
        $(this).addClass("active");
        $(".assignments-list > li").show();
        $("#assignments-statistics > .span8 >.box.stat-box:last-child").show();
      }
      if($(this).hasClass("abd-base"))
      {
        $(this).addClass("active");
        $(".assignments-list > li").hide();
        $(".assignments-list > li > .dependencies").each(function() { 
          if(!$(this).children(".dependeny-icon.xp-icon").length)
          {
            $(this).parent().show();
          }
        });
        $("#assignments-statistics > .span8 >.box.stat-box:last-child").show();
      }
      for(var xpclicked=0;xpclicked<5;xpclicked++)
      {
        if($(this).hasClass("abd-xp" + xpclicked))
        {
          $(this).addClass("active");      
          $(".assignments-list > li").hide();
          $(".assignments-list > li > .dependencies > .dependeny-icon.xp-icon[data-xpack='xp" + xpclicked + "']").parent().parent().show();
          $("#assignments-statistics > .span8 >.box.stat-box:last-child").hide();
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
