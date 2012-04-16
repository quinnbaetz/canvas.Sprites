define(function() {
    //Spriting object template that currently always uses vertical sprites
    //private variables
    var pos = 0;
    var width;
    var height;
    var segHeight;
    
    return function(img, numParts, options){
        
        
        if(img.length){
            //if dealing with an array of images
            numParts = img.length;
            pos = 0;
            width = img[0].naturalWidth;
            height = img[0].naturalHeight;
            segHeight = -1;
        }else{
            //if dealing with a sprite sheet
            if(typeof(numParts) !== "number"){
                options = numParts;
                numParts = options.numParts;
            }
            if(typeof(options) === "undefined"){
                options = {};
            }
            pos = 0;
            width = img.naturalWidth;
            height = img.naturalHeight;
            segHeight = img.naturalHeight/numParts;
        }
        
        options.__proto__ = {scale: 1, x: 0, y: 0, segHeightToDraw: segHeight};
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
            if(img.length){
                //draw array img
                opts.ctx.drawImage(img[pos], 0, 0, img[pos].width, img[pos].height, opts.x, opts.y, img[pos].width*opts.scale, img[pos].height*opts.scale);
            }else{
                //draw segment of img
                opts.ctx.drawImage(img, 0, pos*segHeight, width, opts.segHeightToDraw, opts.x, opts.y, width*opts.scale, segHeight*opts.scale);
            }
        };
        //advances to the next sprite
        this.advance = function(){
            pos = (pos+1)%numParts;
        }
        
    }
});
