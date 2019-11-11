// Generated by CoffeeScript 1.12.1
(function() {
  var WaveDirection, exports;

  exports = this;

  WaveDirection = Torch.Util.Enum("Left", "Right", "Top", "Bottom");

  exports.EnemyGenerator = (function() {
    EnemyGenerator.prototype.currentEnemyGroup = null;

    EnemyGenerator.prototype.waves = 0;

    function EnemyGenerator(game) {
      this.game = game;
      this.directionPool = new Torch.Util.Math.RandomPool();
      this.enemyPool = new Torch.Util.Math.RandomPool();
      this.enemyPool.AddChoice(DiverEnemy, 50);
      this.enemyPool.AddChoice(ShooterEnemy, 50);
      this.directionPool.AddChoice(WaveDirection.Left, 25);
      this.directionPool.AddChoice(WaveDirection.Right, 25);
      this.directionPool.AddChoice(WaveDirection.Top, 25);
      this.directionPool.AddChoice(WaveDirection.Bottom, 25);
      this.Generate();
    }

    EnemyGenerator.prototype.GetWave = function() {
      var columns, direction, enemy, l, rows;
      this.waves += 1;
      columns = 1;
      rows = 1;
      enemy = this.enemyPool.Pick();
      direction = this.directionPool.Pick();
      l = 500;
      switch (direction) {
        case WaveDirection.Left:
          direction = new Torch.Vector(-l, l);
          break;
        case WaveDirection.Right:
          direction = new Torch.Vector(this.game.Camera.Viewport.width + l, l);
          break;
        case WaveDirection.Top:
          direction = new Torch.Vector(l, -l);
          break;
        case WaveDirection.Bottom:
          direction = new Torch.Vector(l, this.game.Camera.Viewport.height + l);
      }
      return [enemy, columns, rows, direction];
    };

    EnemyGenerator.prototype.CreateGroup = function() {
      var columns, direction, enemy, ref, rows;
      this.currentEnemyGroup = new Torch.SpriteGroup(this.game, 100, -300);
      enemy = null;
      rows = null;
      columns = null;
      direction = null;
      ref = this.GetWave(), enemy = ref[0], columns = ref[1], rows = ref[2], direction = ref[3];
      this.currentEnemyGroup.position.Set(direction.x, direction.y);
      this.currentEnemyGroup.Grid(enemy, columns, rows, 100);
      return this.currentEnemyGroup.On('Empty', (function(_this) {
        return function() {
          var ref1;
          ref1 = _this.GetWave(), enemy = ref1[0], columns = ref1[1], rows = ref1[2], direction = ref1[3];
          _this.currentEnemyGroup.position.Set(direction.x, direction.y);
          return _this.currentEnemyGroup.Grid(enemy, columns, rows, 100);
        };
      })(this));
    };

    EnemyGenerator.prototype.Generate = function() {
      return this.CreateGroup();
    };

    return EnemyGenerator;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5lbXlHZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiIsInNvdXJjZXMiOlsiR2FtZXNcXE9wZW5TcGFjZVxcU3JjXFxFbmVteUdlbmVyYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUEsTUFBQTs7RUFBQSxPQUFBLEdBQVU7O0VBRVYsYUFBQSxHQUFnQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQVgsQ0FBZ0IsTUFBaEIsRUFBd0IsT0FBeEIsRUFBaUMsS0FBakMsRUFBd0MsUUFBeEM7O0VBRVYsT0FBTyxDQUFDOzZCQUNWLGlCQUFBLEdBQW1COzs2QkFDbkIsS0FBQSxHQUFPOztJQUNNLHdCQUFDLElBQUQ7TUFBQyxJQUFDLENBQUEsT0FBRDtNQUNWLElBQUMsQ0FBQSxhQUFELEdBQXFCLElBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBaEIsQ0FBQTtNQUNyQixJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQWhCLENBQUE7TUFDakIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxTQUFYLENBQXFCLFVBQXJCLEVBQWlDLEVBQWpDO01BQ0EsSUFBQyxDQUFBLFNBQVMsQ0FBQyxTQUFYLENBQXFCLFlBQXJCLEVBQW1DLEVBQW5DO01BRUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxTQUFmLENBQXlCLGFBQWEsQ0FBQyxJQUF2QyxFQUE2QyxFQUE3QztNQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsU0FBZixDQUF5QixhQUFhLENBQUMsS0FBdkMsRUFBOEMsRUFBOUM7TUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLFNBQWYsQ0FBeUIsYUFBYSxDQUFDLEdBQXZDLEVBQTRDLEVBQTVDO01BQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxTQUFmLENBQXlCLGFBQWEsQ0FBQyxNQUF2QyxFQUErQyxFQUEvQztNQUVBLElBQUMsQ0FBQSxRQUFELENBQUE7SUFYUzs7NkJBYWIsT0FBQSxHQUFTLFNBQUE7QUFDTCxVQUFBO01BQUEsSUFBQyxDQUFBLEtBQUQsSUFBVTtNQUNWLE9BQUEsR0FBVTtNQUNWLElBQUEsR0FBTztNQUNQLEtBQUEsR0FBUSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBQTtNQUNSLFNBQUEsR0FBWSxJQUFDLENBQUEsYUFBYSxDQUFDLElBQWYsQ0FBQTtNQUNaLENBQUEsR0FBSTtBQUNKLGNBQU8sU0FBUDtBQUFBLGFBQ1MsYUFBYSxDQUFDLElBRHZCO1VBRVEsU0FBQSxHQUFnQixJQUFBLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxDQUFkLEVBQWlCLENBQWpCO0FBRGY7QUFEVCxhQUdTLGFBQWEsQ0FBQyxLQUh2QjtVQUlRLFNBQUEsR0FBZ0IsSUFBQSxLQUFLLENBQUMsTUFBTixDQUFhLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUF0QixHQUE4QixDQUEzQyxFQUE4QyxDQUE5QztBQURmO0FBSFQsYUFLUyxhQUFhLENBQUMsR0FMdkI7VUFNUSxTQUFBLEdBQWdCLElBQUEsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakI7QUFEZjtBQUxULGFBT1MsYUFBYSxDQUFDLE1BUHZCO1VBUVEsU0FBQSxHQUFnQixJQUFBLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBYixFQUFnQixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBdEIsR0FBK0IsQ0FBL0M7QUFSeEI7QUFVQSxhQUFPLENBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUIsSUFBakIsRUFBdUIsU0FBdkI7SUFqQkY7OzZCQW1CVCxXQUFBLEdBQWEsU0FBQTtBQUNULFVBQUE7TUFBQSxJQUFDLENBQUEsaUJBQUQsR0FBeUIsSUFBQSxLQUFLLENBQUMsV0FBTixDQUFrQixJQUFDLENBQUEsSUFBbkIsRUFBeUIsR0FBekIsRUFBOEIsQ0FBQyxHQUEvQjtNQUV6QixLQUFBLEdBQVE7TUFDUixJQUFBLEdBQU87TUFDUCxPQUFBLEdBQVU7TUFDVixTQUFBLEdBQVk7TUFFWixNQUFzQyxJQUFDLENBQUEsT0FBRCxDQUFBLENBQXRDLEVBQUUsY0FBRixFQUFTLGdCQUFULEVBQWtCLGFBQWxCLEVBQXdCO01BQ3hCLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBNUIsQ0FBaUMsU0FBUyxDQUFDLENBQTNDLEVBQThDLFNBQVMsQ0FBQyxDQUF4RDtNQUNBLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxJQUFuQixDQUF5QixLQUF6QixFQUFnQyxPQUFoQyxFQUF5QyxJQUF6QyxFQUErQyxHQUEvQzthQUVBLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxFQUFuQixDQUFzQixPQUF0QixFQUErQixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7QUFDM0IsY0FBQTtVQUFBLE9BQXNDLEtBQUMsQ0FBQSxPQUFELENBQUEsQ0FBdEMsRUFBRSxlQUFGLEVBQVMsaUJBQVQsRUFBa0IsY0FBbEIsRUFBd0I7VUFDeEIsS0FBQyxDQUFBLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUE1QixDQUFpQyxTQUFTLENBQUMsQ0FBM0MsRUFBOEMsU0FBUyxDQUFDLENBQXhEO2lCQUNBLEtBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxJQUFuQixDQUF5QixLQUF6QixFQUFnQyxPQUFoQyxFQUF5QyxJQUF6QyxFQUErQyxHQUEvQztRQUgyQjtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0I7SUFaUzs7NkJBaUJiLFFBQUEsR0FBVSxTQUFBO2FBQ04sSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQURNOzs7OztBQXhEZCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSB0aGlzXHJcblxyXG5XYXZlRGlyZWN0aW9uID0gVG9yY2guVXRpbC5FbnVtKFwiTGVmdFwiLCBcIlJpZ2h0XCIsIFwiVG9wXCIsIFwiQm90dG9tXCIpXHJcblxyXG5jbGFzcyBleHBvcnRzLkVuZW15R2VuZXJhdG9yXHJcbiAgICBjdXJyZW50RW5lbXlHcm91cDogbnVsbFxyXG4gICAgd2F2ZXM6IDBcclxuICAgIGNvbnN0cnVjdG9yOiAoQGdhbWUpIC0+XHJcbiAgICAgICAgQGRpcmVjdGlvblBvb2wgPSBuZXcgVG9yY2guVXRpbC5NYXRoLlJhbmRvbVBvb2woKVxyXG4gICAgICAgIEBlbmVteVBvb2wgPSBuZXcgVG9yY2guVXRpbC5NYXRoLlJhbmRvbVBvb2woKVxyXG4gICAgICAgIEBlbmVteVBvb2wuQWRkQ2hvaWNlKERpdmVyRW5lbXksIDUwKVxyXG4gICAgICAgIEBlbmVteVBvb2wuQWRkQ2hvaWNlKFNob290ZXJFbmVteSwgNTApXHJcblxyXG4gICAgICAgIEBkaXJlY3Rpb25Qb29sLkFkZENob2ljZShXYXZlRGlyZWN0aW9uLkxlZnQsIDI1KVxyXG4gICAgICAgIEBkaXJlY3Rpb25Qb29sLkFkZENob2ljZShXYXZlRGlyZWN0aW9uLlJpZ2h0LCAyNSlcclxuICAgICAgICBAZGlyZWN0aW9uUG9vbC5BZGRDaG9pY2UoV2F2ZURpcmVjdGlvbi5Ub3AsIDI1KVxyXG4gICAgICAgIEBkaXJlY3Rpb25Qb29sLkFkZENob2ljZShXYXZlRGlyZWN0aW9uLkJvdHRvbSwgMjUpXHJcblxyXG4gICAgICAgIEBHZW5lcmF0ZSgpXHJcblxyXG4gICAgR2V0V2F2ZTogLT5cclxuICAgICAgICBAd2F2ZXMgKz0gMVxyXG4gICAgICAgIGNvbHVtbnMgPSAxXHJcbiAgICAgICAgcm93cyA9IDFcclxuICAgICAgICBlbmVteSA9IEBlbmVteVBvb2wuUGljaygpXHJcbiAgICAgICAgZGlyZWN0aW9uID0gQGRpcmVjdGlvblBvb2wuUGljaygpXHJcbiAgICAgICAgbCA9IDUwMFxyXG4gICAgICAgIHN3aXRjaCBkaXJlY3Rpb25cclxuICAgICAgICAgICAgd2hlbiBXYXZlRGlyZWN0aW9uLkxlZnRcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IG5ldyBUb3JjaC5WZWN0b3IoLWwsIGwpXHJcbiAgICAgICAgICAgIHdoZW4gV2F2ZURpcmVjdGlvbi5SaWdodFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gbmV3IFRvcmNoLlZlY3RvcihAZ2FtZS5DYW1lcmEuVmlld3BvcnQud2lkdGggKyBsLCBsKVxyXG4gICAgICAgICAgICB3aGVuIFdhdmVEaXJlY3Rpb24uVG9wXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBuZXcgVG9yY2guVmVjdG9yKGwsIC1sKVxyXG4gICAgICAgICAgICB3aGVuIFdhdmVEaXJlY3Rpb24uQm90dG9tXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBuZXcgVG9yY2guVmVjdG9yKGwsIEBnYW1lLkNhbWVyYS5WaWV3cG9ydC5oZWlnaHQgKyBsKVxyXG5cclxuICAgICAgICByZXR1cm4gW2VuZW15LCBjb2x1bW5zLCByb3dzLCBkaXJlY3Rpb25dXHJcblxyXG4gICAgQ3JlYXRlR3JvdXA6IC0+XHJcbiAgICAgICAgQGN1cnJlbnRFbmVteUdyb3VwID0gbmV3IFRvcmNoLlNwcml0ZUdyb3VwKEBnYW1lLCAxMDAsIC0zMDApXHJcblxyXG4gICAgICAgIGVuZW15ID0gbnVsbFxyXG4gICAgICAgIHJvd3MgPSBudWxsXHJcbiAgICAgICAgY29sdW1ucyA9IG51bGxcclxuICAgICAgICBkaXJlY3Rpb24gPSBudWxsXHJcblxyXG4gICAgICAgIFsgZW5lbXksIGNvbHVtbnMsIHJvd3MsIGRpcmVjdGlvbiBdID0gQEdldFdhdmUoKVxyXG4gICAgICAgIEBjdXJyZW50RW5lbXlHcm91cC5wb3NpdGlvbi5TZXQoIGRpcmVjdGlvbi54LCBkaXJlY3Rpb24ueSApXHJcbiAgICAgICAgQGN1cnJlbnRFbmVteUdyb3VwLkdyaWQoIGVuZW15LCBjb2x1bW5zLCByb3dzLCAxMDAgKVxyXG5cclxuICAgICAgICBAY3VycmVudEVuZW15R3JvdXAuT24gJ0VtcHR5JywgPT5cclxuICAgICAgICAgICAgWyBlbmVteSwgY29sdW1ucywgcm93cywgZGlyZWN0aW9uIF0gPSBAR2V0V2F2ZSgpXHJcbiAgICAgICAgICAgIEBjdXJyZW50RW5lbXlHcm91cC5wb3NpdGlvbi5TZXQoIGRpcmVjdGlvbi54LCBkaXJlY3Rpb24ueSApXHJcbiAgICAgICAgICAgIEBjdXJyZW50RW5lbXlHcm91cC5HcmlkKCBlbmVteSwgY29sdW1ucywgcm93cywgMTAwIClcclxuXHJcbiAgICBHZW5lcmF0ZTogLT5cclxuICAgICAgICBAQ3JlYXRlR3JvdXAoKVxyXG4iXX0=
//# sourceURL=C:\dev\js\Torch.js\Games\OpenSpace\Src\EnemyGenerator.coffee