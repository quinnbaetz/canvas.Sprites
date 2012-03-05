define(function() {
    //Spriting object template that currently always uses vertical sprites
    return function(img, numParts, options){
        if(typeof(numParts) !== "number"){
            options = numParts;
            numParts = options.numParts;
        }
        if(typeof(options) === "undefined"){
            options = {};
        }
        
        
        //private variables
        var pos = 0;
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        var segHeight = img.naturalHeight/numParts;
        options.__proto = {scale: 1, x: 0, y: 0, segHeightToDraw: segHeight};
        //public variables
        this.numParts = numParts;
        
        //setters
        this.setNumParts = function(numParts){
            this.numParts = numParts;
        };
        this.addOption = function(prop, val){
            options[prop] = val;
        }
        //getters
        this.getNumParts = function(){
            return this.numParts;
        };
        this.setPos = function(posTemp){
            if(posTemp<0 || posTemp>numParts){
                return;
            }
            pos = posTemp;
        };
        this.getPos = function(){
            return pos;
        };
        this.getWidth = function(){
            return width;
        };
        this.getHeight = function(){
            return height;
        };
        this.getSegWidth = function(){
            return width;
        };
        this.getSegHeight = function(){
            return segHeight;
        };
        this.draw = function(opts){
            if(typeof(opts) === "undefined"){
                opts = {};
            }
            opts.__proto__ = options
            opts.ctx.drawImage(img, 0, pos*segHeight, width, opts.segHeightToDraw, opts.x, opts.y, width*opts.scale, segHeight*opts.scale);
        };
        this.advance = function(){
            pos = (pos+1)%numParts;
        }
        
    }
});