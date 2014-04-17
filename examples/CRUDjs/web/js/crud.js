(function ($) {
    $.CRUD = function (resource) { 
        this.resource = resource;
        this.templates = [];
        this.events = [];
        this.hooks = [];
    };
    
    $.CRUD.path = "";
    $.CRUD.container = "container";
    $.CRUD.resources = "res";
        
    $.CRUD.prototype = { 
        list: function () {
            
            var html="";
            me = this;
            $.getJSON( $.CRUD.path+"/"+this.resource+"/", function( data ) {
                if ( data != null ) {
                    template = me.getTemplate('list');
                    if(template){
                        html = Mustache.render(template,data);
                        $('#'+$.CRUD.container).html(html);
                        me.callEvent('on-list-load');
                        me.bindActions();
                    }
                    else{
                        $.get($.CRUD.resources+"/"+me.resource +"/list.html", function(template){
                            if(template){
                                me.templates['list'] = template;
                                html = Mustache.render(template,data);
                                $('#'+$.CRUD.container).html(html);
                                me.callEvent('on-list-load');
                                me.bindActions();
                            }
                            else{
                                html = Mustache.render(me.CreateTemplate(data),data);
                                me.callEvent('before-list-load');
                                $('#'+$.CRUD.container).html(html);
                                me.callEvent('on-list-load');
                                me.bindActions();
                            }
                        });
                    }
                }
            });
        },
        show: function (id) {
            me = this;
            $.getJSON( $.CRUD.path+"/"+this.resource+"/"+id, function( data ) {
                me.loadTemplate('show', function(template){
                    if (template){
                        html = Mustache.render(template,data);
                    }
                    else{
                        html = Mustache.render(me.createTemplate(data) ,data);
                    }
                    $("#single-content-area").html(html);
                    me.callEvent('on-show-load');
                });
            });
        },
        add: function () {
            me = this;
            me.loadTemplate('add', function(template){
                    if (template){
                        html = Mustache.render(template,{});
                    }
                    else{
                        //html = Mustache.render(me.createTemplate(data) ,data);
                    }
                    $("#single-content-area").html(html);
                    me.callEvent('on-add-load');
                    
                });
                //settings.onadd();
        },
        save: function(attributes){
           
            $.ajax({
                type: "POST",
                dataType: "json",
                url: $.CRUD.path+"/"+this.resource+"/",
                data: attributes
            })
            .done(function(data) {
                me.list();
                me.callEvent('on-save');
            });
        },
        edit: function(id){
            me = this;
            $.getJSON( $.CRUD.path+"/"+this.resource+"/"+id, function( data ) {
                me.loadTemplate('edit', function(template){
                    if (template){
                        html = Mustache.render(template,data);
                    }
                    else{
                        html = Mustache.render(me.createTemplate(data) ,data);
                    }
                    
                    $('#single-content-area').html(html);
                    me.hooks['on-edit-load']();
                });
            });
        },
        update: function (id, attributes) {
         
            $.ajax({
                type: "PUT",
                dataType: "json",
                url: $.CRUD.path+"/"+this.resource+"/"+id,
                data: attributes
            })
            .done(function(data) {
                me.list();
                me.hooks['on-update']();
            });
        },
        remove: function (id) {
            me =  this;
            if(!confirm("Are you sure you want to delete?")) return;
            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: $.CRUD.path+"/"+this.resource+"/"+id
            })
            .done(function(data) {
                me.list();
                me.hooks['on-remove']();
            });
           
        },
        getTemplate: function(view){
            me =  this;
            template = me.templates[view];
            if(template){
                return template;
            }
            else{
                template = $('#'+me.resource + '-'+view).html();
                if (template){
                    me.templates[view] = template;
                    return template;
                }
            }     
        },
        loadTemplate: function(view, callback){
            me = this;
            template = me.getTemplate(view);
                if(template){
                    callback(template);
                    me.bindActions();
                }
                else{
                    $.get($.CRUD.resources+"/"+me.resource +"/"+view+".html", function(template){
                        if(template){
                            me.templates[view] = template;
                            callback(template);
                            me.bindActions();
                        }
                        else{
                            callback(null);
                            me.bindActions();
                        }
                    });
                }
        },
        callEvent: function (event) {
            me = this;
            if (me.hooks[event]) {
                me.hooks[event]();
            }
        },
        addEvent : function(event, callbackFn){
            this.hooks[event] = callbackFn;
        },
        addAction: function(action, callbackFn){
            this.events[action] = callbackFn;
        },
        createTemplate : function(data) {
            var retHtml = "<tr>";
            for (var name in data) {
                if (data.hasOwnProperty(name)) {
                    retHtml += "<td>{{" + name + "}}</td>";
                }
            }
            if (data.hasOwnProperty('id'))
                retHtml += "<tr>" +
            '<a href="#!view" data-action="view">View</a>' +
            '<a href="#!edit" data-action="edit">Edit</a>' +
            '<a href="#!delete" data-action="delete">Delete</a></td>';
            retHtml += "</tr>";
            return retHtml;
        },
        bindActions: function(){
            me =  this;
            $('[data-action=list]').each(function(){
                $(this).click(function(e){
                    e.preventDefault();
                    me.list();
                })
            });
            $('[data-action=view]').each(function(){
                $(this).click(function(e){
                    e.preventDefault();
                    me.show($(this).data('id'));
                })
            });
            $('[data-action=add]').each(function(){
                $(this).click(function(e){
                    e.preventDefault();
                    me.add();
                })
            });
            $('[data-action=save]').each(function(){
                $(this).click(function(e){
                    e.preventDefault();
                    data = $(this).parents("form").serialize();
                    me.save(data);
                })
            });
            $('[data-action=edit]').each(function(){
                $(this).click(function(e){
                    e.preventDefault();
                    me.edit($(this).data('id'))
                })
            });
            $('[data-action=update]').each(function(){
                $(this).click(function(e){
                    e.preventDefault();
                    data = $(this).parents("form").serialize();
                    me.update($(this).data('id'), data);
                })
            });
            $('[data-action=delete]').each(function(){
                $(this).click(function(e){
                    e.preventDefault(e);
                    me.remove($(this).data('id'));
                })
            });
//            me.events.each( function(action, element){
//                $('[data-action='+action+']').each(element($(this)));
//            });
            //$('[data-action='+action+]').each
        }
 
    }
}(jQuery));
    
