// Generated by CoffeeScript 1.12.1
(function() {
  var exports;

  exports = this;

  exports.MainMenu = (function() {
    function MainMenu(game1) {
      var fontSize, textColor;
      this.game = game1;
      textColor = "white";
      fontSize = 18;
      this.background = new Background(this.game);
      this.titleText = this.game.Factory.Text(0, 300, {
        text: "Open Space",
        font: "main-font",
        color: "white",
        fontSize: 48
      });
      this.titleText.Center();
      this.startButton = this.game.Factory.Button(500, 400, {
        color: textColor,
        text: "Start",
        font: "main-font",
        fontSize: fontSize
      }, {
        mainBackground: "button-background",
        mouseDownBackground: "button-background-mouse-down"
      });
      this.tutorialButton = this.game.Factory.Button(500, 500, {
        color: textColor,
        text: "Tutorial",
        font: "main-font",
        fontSize: fontSize
      }, {
        mainBackground: "button-background",
        mouseDownBackground: "button-background-mouse-down"
      });
      this.creditsButton = this.game.Factory.Button(500, 600, {
        color: textColor,
        text: "Credits",
        font: "main-font",
        fontSize: fontSize
      }, {
        mainBackground: "button-background",
        mouseDownBackground: "button-background-mouse-down"
      });
      this.quitButton = this.game.Factory.Button(500, 700, {
        color: textColor,
        text: "Quit",
        font: "main-font",
        fontSize: fontSize
      }, {
        mainBackground: "button-background-red",
        mouseDownBackground: "button-background-mouse-down-red"
      });
      this.startButton.Center();
      this.tutorialButton.Center();
      this.creditsButton.Center();
      this.quitButton.Center();
      this.startButton.On("Click", (function(_this) {
        return function() {
          return _this.game.State.Switch("startGame");
        };
      })(this));
      this.creditsButton.On("Click", (function(_this) {
        return function() {
          return _this.game.State.Switch("credits");
        };
      })(this));
      this.quitButton.On("Click", function() {
        return require('electron').remote.app.quit();
      });
    }

    MainMenu.prototype.Trash = function() {
      this.titleText.Trash();
      this.background.Trash();
      this.startButton.Trash();
      this.tutorialButton.Trash();
      this.creditsButton.Trash();
      return this.quitButton.Trash();
    };

    MainMenu.Load = function(game) {
      game.Load.Texture("Assets/Art/UI/purple_button00.png", "button-background");
      game.Load.Texture("Assets/Art/UI/purple_button01.png", "button-background-mouse-down");
      game.Load.Texture("Assets/Art/UI/red_button00.png", "button-background-red");
      return game.Load.Texture("Assets/Art/UI/red_button01.png", "button-background-mouse-down-red");
    };

    return MainMenu;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbk1lbnUuanMiLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiIsInNvdXJjZXMiOlsiR2FtZXNcXE9wZW5TcGFjZVxcU3JjXFxNYWluTWVudS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUEsTUFBQTs7RUFBQSxPQUFBLEdBQVU7O0VBRUosT0FBTyxDQUFDO0lBRUcsa0JBQUMsS0FBRDtBQUNULFVBQUE7TUFEVSxJQUFDLENBQUEsT0FBRDtNQUNWLFNBQUEsR0FBWTtNQUNaLFFBQUEsR0FBVztNQUNYLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsVUFBQSxDQUFXLElBQUMsQ0FBQSxJQUFaO01BRWxCLElBQUMsQ0FBQSxTQUFELEdBQWEsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBZCxDQUFtQixDQUFuQixFQUFzQixHQUF0QixFQUNUO1FBQUEsSUFBQSxFQUFNLFlBQU47UUFDQSxJQUFBLEVBQU0sV0FETjtRQUVBLEtBQUEsRUFBTyxPQUZQO1FBR0EsUUFBQSxFQUFVLEVBSFY7T0FEUztNQU1iLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxDQUFBO01BRUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFkLENBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQ1g7UUFDSSxLQUFBLEVBQU8sU0FEWDtRQUVJLElBQUEsRUFBTSxPQUZWO1FBR0ksSUFBQSxFQUFNLFdBSFY7UUFJSSxRQUFBLEVBQVUsUUFKZDtPQURXLEVBT1g7UUFDSSxjQUFBLEVBQWdCLG1CQURwQjtRQUVJLG1CQUFBLEVBQXFCLDhCQUZ6QjtPQVBXO01BWWYsSUFBQyxDQUFBLGNBQUQsR0FBa0IsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBZCxDQUFxQixHQUFyQixFQUEwQixHQUExQixFQUNkO1FBQ0ksS0FBQSxFQUFPLFNBRFg7UUFFSSxJQUFBLEVBQU0sVUFGVjtRQUdJLElBQUEsRUFBTSxXQUhWO1FBSUksUUFBQSxFQUFVLFFBSmQ7T0FEYyxFQU9kO1FBQ0ksY0FBQSxFQUFnQixtQkFEcEI7UUFFSSxtQkFBQSxFQUFxQiw4QkFGekI7T0FQYztNQVlsQixJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFkLENBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQ2I7UUFDSSxLQUFBLEVBQU8sU0FEWDtRQUVJLElBQUEsRUFBTSxTQUZWO1FBR0ksSUFBQSxFQUFNLFdBSFY7UUFJSSxRQUFBLEVBQVUsUUFKZDtPQURhLEVBT2I7UUFDSSxjQUFBLEVBQWdCLG1CQURwQjtRQUVJLG1CQUFBLEVBQXFCLDhCQUZ6QjtPQVBhO01BWWpCLElBQUMsQ0FBQSxVQUFELEdBQWMsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBZCxDQUFxQixHQUFyQixFQUEwQixHQUExQixFQUNWO1FBQ0ksS0FBQSxFQUFPLFNBRFg7UUFFSSxJQUFBLEVBQU0sTUFGVjtRQUdJLElBQUEsRUFBTSxXQUhWO1FBSUksUUFBQSxFQUFVLFFBSmQ7T0FEVSxFQU9WO1FBQ0ksY0FBQSxFQUFnQix1QkFEcEI7UUFFSSxtQkFBQSxFQUFxQixrQ0FGekI7T0FQVTtNQWFkLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBYixDQUFBO01BQ0EsSUFBQyxDQUFBLGNBQWMsQ0FBQyxNQUFoQixDQUFBO01BQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxNQUFmLENBQUE7TUFDQSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosQ0FBQTtNQUVBLElBQUMsQ0FBQSxXQUFXLENBQUMsRUFBYixDQUFnQixPQUFoQixFQUF5QixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7aUJBQ3JCLEtBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQVosQ0FBbUIsV0FBbkI7UUFEcUI7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXpCO01BR0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFDdkIsS0FBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBWixDQUFtQixTQUFuQjtRQUR1QjtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0I7TUFHQSxJQUFDLENBQUEsVUFBVSxDQUFDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFNBQUE7ZUFBRyxPQUFBLENBQVMsVUFBVCxDQUFxQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBakMsQ0FBQTtNQUFILENBQXhCO0lBekVTOzt1QkEyRWIsS0FBQSxHQUFPLFNBQUE7TUFDSCxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsQ0FBQTtNQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixDQUFBO01BQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLENBQUE7TUFDQSxJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLENBQUE7TUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLEtBQWYsQ0FBQTthQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixDQUFBO0lBTkc7O0lBUVAsUUFBQyxDQUFBLElBQUQsR0FBTyxTQUFDLElBQUQ7TUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsbUNBQWxCLEVBQXVELG1CQUF2RDtNQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixtQ0FBbEIsRUFBdUQsOEJBQXZEO01BRUEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFWLENBQWtCLGdDQUFsQixFQUFvRCx1QkFBcEQ7YUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsZ0NBQWxCLEVBQW9ELGtDQUFwRDtJQUxHOzs7OztBQXZGWCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSB0aGlzXHJcblxyXG5jbGFzcyBleHBvcnRzLk1haW5NZW51XHJcblxyXG4gICAgY29uc3RydWN0b3I6IChAZ2FtZSkgLT5cclxuICAgICAgICB0ZXh0Q29sb3IgPSBcIndoaXRlXCJcclxuICAgICAgICBmb250U2l6ZSA9IDE4XHJcbiAgICAgICAgQGJhY2tncm91bmQgPSBuZXcgQmFja2dyb3VuZChAZ2FtZSlcclxuXHJcbiAgICAgICAgQHRpdGxlVGV4dCA9IEBnYW1lLkZhY3RvcnkuVGV4dCAwLCAzMDAsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiT3BlbiBTcGFjZVwiXHJcbiAgICAgICAgICAgIGZvbnQ6IFwibWFpbi1mb250XCJcclxuICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIlxyXG4gICAgICAgICAgICBmb250U2l6ZTogNDhcclxuXHJcbiAgICAgICAgQHRpdGxlVGV4dC5DZW50ZXIoKVxyXG5cclxuICAgICAgICBAc3RhcnRCdXR0b24gPSBAZ2FtZS5GYWN0b3J5LkJ1dHRvbiA1MDAsIDQwMCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRleHRDb2xvclxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdGFydFwiXHJcbiAgICAgICAgICAgICAgICBmb250OiBcIm1haW4tZm9udFwiXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWFpbkJhY2tncm91bmQ6IFwiYnV0dG9uLWJhY2tncm91bmRcIlxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duQmFja2dyb3VuZDogXCJidXR0b24tYmFja2dyb3VuZC1tb3VzZS1kb3duXCJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBAdHV0b3JpYWxCdXR0b24gPSBAZ2FtZS5GYWN0b3J5LkJ1dHRvbiA1MDAsIDUwMCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRleHRDb2xvclxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUdXRvcmlhbFwiXHJcbiAgICAgICAgICAgICAgICBmb250OiBcIm1haW4tZm9udFwiXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWFpbkJhY2tncm91bmQ6IFwiYnV0dG9uLWJhY2tncm91bmRcIlxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duQmFja2dyb3VuZDogXCJidXR0b24tYmFja2dyb3VuZC1tb3VzZS1kb3duXCJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBAY3JlZGl0c0J1dHRvbiA9IEBnYW1lLkZhY3RvcnkuQnV0dG9uIDUwMCwgNjAwLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogdGV4dENvbG9yXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkNyZWRpdHNcIlxyXG4gICAgICAgICAgICAgICAgZm9udDogXCJtYWluLWZvbnRcIlxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1haW5CYWNrZ3JvdW5kOiBcImJ1dHRvbi1iYWNrZ3JvdW5kXCJcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93bkJhY2tncm91bmQ6IFwiYnV0dG9uLWJhY2tncm91bmQtbW91c2UtZG93blwiXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgQHF1aXRCdXR0b24gPSBAZ2FtZS5GYWN0b3J5LkJ1dHRvbiA1MDAsIDcwMCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRleHRDb2xvclxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJRdWl0XCJcclxuICAgICAgICAgICAgICAgIGZvbnQ6IFwibWFpbi1mb250XCJcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtYWluQmFja2dyb3VuZDogXCJidXR0b24tYmFja2dyb3VuZC1yZWRcIlxyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duQmFja2dyb3VuZDogXCJidXR0b24tYmFja2dyb3VuZC1tb3VzZS1kb3duLXJlZFwiXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIEBzdGFydEJ1dHRvbi5DZW50ZXIoKVxyXG4gICAgICAgIEB0dXRvcmlhbEJ1dHRvbi5DZW50ZXIoKVxyXG4gICAgICAgIEBjcmVkaXRzQnV0dG9uLkNlbnRlcigpXHJcbiAgICAgICAgQHF1aXRCdXR0b24uQ2VudGVyKClcclxuXHJcbiAgICAgICAgQHN0YXJ0QnV0dG9uLk9uIFwiQ2xpY2tcIiwgPT5cclxuICAgICAgICAgICAgQGdhbWUuU3RhdGUuU3dpdGNoKFwic3RhcnRHYW1lXCIpXHJcblxyXG4gICAgICAgIEBjcmVkaXRzQnV0dG9uLk9uIFwiQ2xpY2tcIiwgPT5cclxuICAgICAgICAgICAgQGdhbWUuU3RhdGUuU3dpdGNoKFwiY3JlZGl0c1wiKVxyXG5cclxuICAgICAgICBAcXVpdEJ1dHRvbi5PbiBcIkNsaWNrXCIsIC0+IHJlcXVpcmUoICdlbGVjdHJvbicgKS5yZW1vdGUuYXBwLnF1aXQoKVxyXG5cclxuICAgIFRyYXNoOiAtPlxyXG4gICAgICAgIEB0aXRsZVRleHQuVHJhc2goKVxyXG4gICAgICAgIEBiYWNrZ3JvdW5kLlRyYXNoKClcclxuICAgICAgICBAc3RhcnRCdXR0b24uVHJhc2goKVxyXG4gICAgICAgIEB0dXRvcmlhbEJ1dHRvbi5UcmFzaCgpXHJcbiAgICAgICAgQGNyZWRpdHNCdXR0b24uVHJhc2goKVxyXG4gICAgICAgIEBxdWl0QnV0dG9uLlRyYXNoKClcclxuXHJcbiAgICBATG9hZDogKGdhbWUpIC0+XHJcbiAgICAgICAgZ2FtZS5Mb2FkLlRleHR1cmUoXCJBc3NldHMvQXJ0L1VJL3B1cnBsZV9idXR0b24wMC5wbmdcIiwgXCJidXR0b24tYmFja2dyb3VuZFwiKVxyXG4gICAgICAgIGdhbWUuTG9hZC5UZXh0dXJlKFwiQXNzZXRzL0FydC9VSS9wdXJwbGVfYnV0dG9uMDEucG5nXCIsIFwiYnV0dG9uLWJhY2tncm91bmQtbW91c2UtZG93blwiKVxyXG5cclxuICAgICAgICBnYW1lLkxvYWQuVGV4dHVyZShcIkFzc2V0cy9BcnQvVUkvcmVkX2J1dHRvbjAwLnBuZ1wiLCBcImJ1dHRvbi1iYWNrZ3JvdW5kLXJlZFwiKVxyXG4gICAgICAgIGdhbWUuTG9hZC5UZXh0dXJlKFwiQXNzZXRzL0FydC9VSS9yZWRfYnV0dG9uMDEucG5nXCIsIFwiYnV0dG9uLWJhY2tncm91bmQtbW91c2UtZG93bi1yZWRcIilcclxuIl19
//# sourceURL=C:\dev\js\Torch.js\Games\OpenSpace\Src\MainMenu.coffee