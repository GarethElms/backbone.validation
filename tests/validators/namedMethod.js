buster.testCase("named method validator", {
    setUp: function() {
        var that = this;
        var Model = Backbone.Model.extend({
            validation: {
                name: 'validateName'
            },
            validateName: function(val, attr){
                that.ctx = this;
                that.attr = attr;
                if(val !== 'backbone') {
                    return 'Error';
                }
            }
        });
        
        this.model = new Model();
        this.view = new Backbone.View({
            model: this.model
        });

        Backbone.Validation.bind(this.view, {
            valid: this.spy(),
            invalid: this.spy()
        });
    },
    
    "is invalid when method returns error message": function() {
        refute(this.model.set({name: ''}));
    },
            
    "is valid when method returns undefined": function() {
        assert(this.model.set({name: 'backbone'}));
    },
    
    "context is the model": function() {
        this.model.set({name: ''});
        assert.same(this.ctx, this.model);
    },
    
    "second argument is the name of the attribute being validated": function() {
        this.model.set({name: ''});
        assert.equals('name', this.attr);
    }
});