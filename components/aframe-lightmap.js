AFRAME.registerComponent('lightmap', {
  multiple: true,
  schema: {
    texture: {type:'asset', default:''},
    key: {type:'string', default:''}
  },
  init: function(){
    
    var self = this;

    self.lightMap = new THREE.Texture();
    self.lightMap.image = self.data.texture;
    self.lightMap.flipY = false;

    self.el.addEventListener('model-loaded', () => {
      var obj = self.el.object3D;
      obj.traverse(node => {
        if (node.type == "Mesh") {

          var matArguments = node.material.name.split('|');

          matArguments.forEach(element => {
            if ( element == self.data.key ) {
              
              //set lightmap from a-frame asset
              node.material.lightMap = self.lightMap;
              node.material.lightMapIntensity = 1.5;
              node.material.lightMap.needsUpdate = true;

              // white clay model
              // node.material.map = null;
              // node.material.normalMap = null;
              // node.material.lightMapIntensity = 1;
              // node.material.color = new THREE.Color( 0xffffff );  

            }
          });

        } 
      });
    });

  }
});