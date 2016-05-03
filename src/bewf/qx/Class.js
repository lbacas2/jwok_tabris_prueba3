/*******************************************************************************
 * Copyright (c) 2004, 2014 1&1 Internet AG, Germany, http://www.1und1.de,
 *                          EclipseSource, and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    1&1 Internet AG and others - original API and implementation
 *    EclipseSource - adaptation for the Eclipse Remote Application Platform
 ******************************************************************************/

/*global alert:false */

namespace( "jsw.qx" );

/**
 * Each instance of a class defined by {@link #define} has the following keys attached to the
 * constructor and the prototype:
 *
 * - classname - The fully-qualified name of the class (e.g. <code>"qx.ui.core.Widget"</code>)
 * - basename - The namespace part of the class name (e.g. <code>"qx.ui.core"</code>)
 * - constructor - A reference to the constructor of the class
 * - superclass - A reference to the constructor of the super class
 *
 * Each method may access static members of the same class by using `this.self(arguments)`
 * ({@link jsw.qx.Object#self}):
 * <pre class='javascript'>
 * statics : { FOO : "bar" },
 * members: {
 *   baz: function(x) {
 *     this.self(arguments).FOO;
 *     ...
 *   }
 * }
 * </pre>
 *
 * Each overriding method may call the overridden method by using
 * <code>this.base(arguments [, ...])</code> ({@link jsw.qx.Object#base}). This is also true for
 * calling the constructor of the superclass.
 * <pre class='javascript'>
 * members: {
 *   foo: function(x) {
 *     this.base(arguments, x);
 *     ...
 *   }
 * }
 * </pre>
 */
jsw.qx.Class = {

  _normalizeConfig : function( config ) {
    if( !config ) {
      var config = {};
    }
    if( config.include && !( config.include instanceof Array ) ) {
      config.include = [ config.include ];
    }
    return config;
  },

  /**
   * Define a new class using the qooxdoo class system. This sets up the
   * namespace for the class and generates the class from the definition map.
   *
   * Example:
   * <pre class='javascript'>
   * jsw.qx.Class.define( "name", {
   *   extend : Object, // superclass
   *   include : [Mixins],
   *
   *   statics: {
   *     CONSTANT : 3.141,
   *
   *     publicMethod: function() {},
   *     _protectedMethod: function() {},
   *     __privateMethod: function() {}
   *   },
   *
   *   properties: {
   *     "tabIndexOld": { type: "number", defaultValue : -1 }
   *     "tabIndex": { check: "Number", init : -1 }
   *   },
   *
   *   members: {
   *     publicField: "foo",
   *     publicMethod: function() {},
   *
   *     _protectedField: "bar",
   *     _protectedMethod: function() {},
   *
   *     __privateField: "baz",
   *     __privateMethod: function() {}
   *   }
   * } );
   * </pre>
   *
   * @param name {String} Name of the class
   * @param config {Map ? null} Class definition structure. The configuration map has the
   *   following keys:
   *   - extend {Class}: The super class the current class inherits from.
   *   - include {Mixin | Mixin[]}: Single mixin or array of mixins, which will be merged into the
   *     class.
   *   - construct {Function} The constructor of the class.
   *   - statics {Map} Map of static members of the class.
   *   - properties {Map} Map of property definitions. For a description of the format of a
   *     property definition see {@link jsw.qx.Property}
   *   - members {Map}: Map of instance members of the class.
   *   - events {Map}: Map of events the class fires. The keys are the names of the events and the
   *     values are the corresponding event type class names.
   *   - defer {Function}: Function that is called at the end of processing the class
   *     declaration. It allows access to the declared statics, members and properties.
   *   - destruct {Function}: The destructor of the class.
   */
  define : function( name, config ) {
    if( this._stopLoading ) {
      throw new Error( "Stop loading " + name );
    }
    try {
      config = this._normalizeConfig( config );
      var clazz;
      if( !config.extend ) {
        clazz = config.statics || {};
      } else {
        if( !config.construct ) {
          config.construct = this.__createDefaultConstructor();
        }
        clazz = this.__wrapConstructor( config.construct, name );
        if( config.statics ) {
          var key;
          for( var i = 0, a = jsw.util.Objects.getKeys( config.statics ), l = a.length; i < l; i++ ) {
            key = a[ i ];
            clazz[ key ] = config.statics[ key ];
          }
        }
      }
      var basename = this.createNamespace( name, clazz, false );
      clazz.name = clazz.classname = name;
      clazz.basename = basename;
      this.__registry[ name ] = clazz;

      // Attach toString
      if( !clazz.hasOwnProperty( "toString" ) ) {
        clazz.toString = this.genericToString;
      }

      if( config.extend ) {
        var superproto = config.extend.prototype;
        var Helper = this.__createEmptyFunction();
        Helper.prototype = superproto;
        var proto = new Helper();
        clazz.prototype = proto;
        proto.name = proto.classname = name;
        proto.basename = basename;
        config.construct.base = clazz.superclass = config.extend;
        config.construct.self = clazz.constructor = proto.constructor = clazz;
        if( config.destruct ) {
          clazz.$$destructor = config.destruct;
        }
        var that = this;
        clazz.$$initializer = function() {
          //console.log( "init " + name );
          if( config.properties ) {
            that.__addProperties( clazz, config.properties, true );
          }
          if( config.members ) {
            that.__addMembers( clazz, config.members, true, true, false );
          }
          if( config.events ) {
            that.__addEvents( clazz, config.events, true );
          }
          if( config.include ) {
            for( var i = 0, l = config.include.length; i < l; i++ ) {
              that.__addMixin( clazz, config.include[ i ], false );
            }
          }
        };
      }
      if( config.defer ) {
        this.__initializeClass( clazz );
        config.defer.self = clazz;
        config.defer( clazz, clazz.prototype, {
          add : function( name, config ) {
            var properties = {};
            properties[ name ] = config;
            jsw.qx.Class.__addProperties( clazz, properties, true );
          }
        } );
      }
    } catch( ex ) {
      // Use alert here since ErrorHandler.js might not be parsed yet. In case of a class loader
      // error, this is the only way to be sure the user sees the message.
      alert( "Error loading class " + name + ": " + ( ex.message ? ex.message : ex ) );
      this._stopLoading = true;
      throw ex;
    }
  },

  /**
   * Creates a namespace and assigns the given object to it.
   *
   * @param name {String} The complete namespace to create. Typically, the last part is the class
   *   name itself
   * @param object {Object} The object to attach to the namespace
   * @return {Object} last part of the namespace (typically the class name)
   */
  createNamespace : function( name, object ) {
    var splits = name.split( "." );
    var parent = window;
    var part = splits[ 0 ];
    for( var i = 0, l = splits.length - 1; i < l; i++, part = splits[ i ] ) {
      if( !parent[ part ] ) {
        parent = parent[ part ] = {};
      } else {
        parent = parent[ part ];
      }
    }
    if( parent[ part ] === undefined ) {
      parent[ part ] = object;
    }
    // return last part name (i.e. classname)
    return part;
  },

  /**
   * Whether the given class exists
   *
   * @param name {String} class name to check
   * @return {Boolean} true if class exists
   */
  isDefined : function( name ) {
    return this.__registry[ name ] !== undefined;
  },

  /**
   * Include all features of the given mixin into the class. The mixin must
   * not include any methods or properties that are already available in the
   * class. This would only be possible using the {@link #patch} method.
   *
   * @param clazz {Class} An existing class which should be modified by including the mixin.
   * @param mixin {Mixin} The mixin to be included.
   */
  include : function( clazz, mixin ) {
    jsw.qx.Class.__addMixin( clazz, mixin, false );
  },

  /**
   * Include all features of the given mixin into the class. The mixin may
   * include features which are already defined in the target class. Existing
   * features of equal name will be overwritten.
   * Please keep in mind that this functionality is not intented for regular
   * use, but as a formalized way (and a last resort) in order to patch
   * existing classes.
   *
   * <b>WARNING</b>: You may break working classes and features.
   *
   * @param clazz {Class} An existing class which should be modified by including the mixin.
   * @param mixin {Mixin} The mixin to be included.
   */
  patch : function( clazz, mixin ) {
    jsw.qx.Class.__addMixin( clazz, mixin, true );
  },

  /**
   * Whether a class is a direct or indirect sub class of another class,
   * or both classes coincide.
   *
   * @param clazz {Class} the class to check.
   * @param superClass {Class} the potential super class
   * @return {Boolean} whether clazz is a sub class of superClass.
   */
  isSubClassOf : function( clazz, superClass ) {
    if( !clazz ) {
      return false;
    }
    if( clazz == superClass ) {
      return true;
    }
    if( clazz.prototype instanceof superClass ) {
      return true;
    }
    return false;
  },

  /**
   * This method will be attached to all classes to return
   * a nice identifier for them.
   *
   * @internal
   * @return {String} The class identifier
   */
  genericToString : function() {
    return "[Class " + this.classname + "]";
  },

  /** Stores all defined classes */
  __registry : {},

  /**
   * Attach events to the class
   *
   * @param clazz {Class} class to add the events to
   * @param events {Map} map of event names the class fires.
   * @param patch {Boolean ? false} Enable redefinition of event type?
   */
  __addEvents : function( clazz, events, patch ) {
    if( clazz.$$events ) {
      for( var key in events ) {
        clazz.$$events[ key ] = events[ key ];
      }
    } else {
      clazz.$$events = events;
    }
  },

  /**
   * Attach properties to classes
   *
   * @param clazz {Class} class to add the properties to
   * @param properties {Map} map of properties
   * @param patch {Boolean ? false} Overwrite property with the limitations of a property
   *         which means you are able to refine but not to replace (esp. for new properties)
   */
  __addProperties : function( clazz, properties, patch ) {
    var config;
    if( patch === undefined ) {
      patch = false;
    }
    var attach = !!clazz.$$propertiesAttached;
    for( var name in properties ) {
      config = properties[ name ];

      // Store name into configuration
      config.name = name;

      // Add config to local registry
      if( !config.refine ) {
        if( clazz.$$properties === undefined ) {
          clazz.$$properties = {};
        }
        clazz.$$properties[ name ] = config;
      }

      // Store init value to prototype. This makes it possible to
      // overwrite this value in derived classes.
      if( config.init !== undefined ) {
        clazz.prototype[ "__init$" + name ] = config.init;
      }

      // register event name
      if( config.event !== undefined ) {
        var event = {};
        event[ config.event ] = "jsw.event.ChangeEvent";
        this.__addEvents( clazz, event, patch );
      }

      // Remember inheritable properties
      if( config.inheritable ) {
        jsw.qx.Property.$$inheritable[ name ] = true;
      }

      // If instances of this class were already created, we
      // need to attach the new style properties functions, directly.
      if( attach ) {
        jsw.qx.Property.attachMethods( clazz, name, config );
      }

      // Create old style properties
      if( config._fast ) {
        jsw.qx.LegacyProperty.addFastProperty( config, clazz.prototype );
      } else if( config._cached ) {
        jsw.qx.LegacyProperty.addCachedProperty( config, clazz.prototype );
      }
    }
  },

  /**
   * Attach members to a class
   *
   * @param clazz {Class} clazz to add members to
   * @param members {Map} The map of members to attach
   * @param patch {Boolean ? false} Enable patching of
   * @param base (Boolean ? true) Attach base flag to mark function as members
   *     of this class
   * @param wrap {Boolean ? false} Whether the member method should be wrapped.
   *     this is needed to allow base calls in patched mixin members.
   */
  __addMembers : function( clazz, members, patch, base, wrap ) {
    var proto = clazz.prototype;
    var key, member;
    for( var i = 0, a = jsw.util.Objects.getKeys( members ), l = a.length; i < l; i++ ) {
      key = a[ i ];
      member = members[ key ];
      // Added helper stuff to functions
      // Hint: Could not use typeof function because RegExp objects are functions, too
      if( base !== false && member instanceof Function ) {
        if( wrap === true ) {
          // wrap "patched" mixin member
          member = this.__mixinMemberWrapper( member, proto[ key ] );
        } else {
          // Configure extend (named base here)
          // Hint: proto[key] is not yet overwritten here
          if( proto[ key ] ) {
            member.base = proto[ key ];
          }
          member.self = clazz;
        }
      }
      // Attach member
      proto[ key ] = member;
    }
  },

  /**
   * Wraps a member function of a mixin, which is included using "patch". This
   * allows "base" calls in the mixin member function.
   *
   * @param member {Function} The mixin method to wrap
   * @param base {Function} The overwritten method
   * @return {Function} the wrapped mixin member
   */
  __mixinMemberWrapper : function( member, base ) {
    if( base ) {
      return function() {
        var oldBase = member.base;
        member.base = base;
        var retval = member.apply( this, arguments );
        member.base = oldBase;
        return retval;
      };
    } else {
      return member;
    }
  },

  /**
   * Include all features of the mixin into the given class (recursive).
   *
   * @param clazz {Class} A class previously defined where the mixin should be attached.
   * @param mixin {Mixin} Include all features of this mixin
   * @param patch {Boolean} Overwrite existing fields, functions and properties
   */
  __addMixin : function( clazz, mixin, patch ) {
    // Attach content
    var list = jsw.qx.Mixin.flatten( [ mixin ] );
    var entry;
    for( var i = 0, l = list.length; i < l; i++ ) {
      entry = list[ i ];
      // Attach events
      if( entry.$$events ) {
        this.__addEvents( clazz, entry.$$events, patch );
      }
      // Attach properties (Properties are already readonly themselve, no patch handling needed)
      if( entry.$$properties ) {
        this.__addProperties( clazz, entry.$$properties, patch );
      }
      // Attach members (Respect patch setting, but dont apply base variables)
      if( entry.$$members ) {
        this.__addMembers( clazz, entry.$$members, patch, patch, patch );
      }
    }
    // Store mixin reference
    if( clazz.$$includes ) {
      clazz.$$includes.push( mixin );
      clazz.$$flatIncludes.push.apply( clazz.$$flatIncludes, list );
    } else {
      clazz.$$includes = [ mixin ];
      clazz.$$flatIncludes = list;
    }
  },

  /**
   * Returns the default constructor.
   * This constructor just calles the constructor of the base class.
   *
   * @return {Function} The default constructor.
   */
  __createDefaultConstructor : function() {
    function defaultConstructor() {
      arguments.callee.base.apply( this, arguments );
    }
    return defaultConstructor;
  },

  /**
   * Returns an empty function. This is needed to get an empty function with an empty closure.
   *
   * @return {Function} empty function
   */
  __createEmptyFunction : function() {
    return function() {};
  },

  __initializeClass : function( clazz ) {
    if( clazz.$$initializer ) {
      var inits = [];
      var target = clazz;
      while( target.$$initializer ) {
        inits.push( target );
        target = target.superclass;
      }
      while( inits.length > 0 ) {
        target = inits.pop();
        target.$$initializer();
        delete target.$$initializer;
      }
    }
  },

  /**
   * Generate a wrapper of the original class constructor in order to enable
   * some of the advanced OO features (e.g. abstract class, singleton, mixins)
   *
   * @param construct {Function} the original constructor
   * @param name {String} name of the class
   */
  __wrapConstructor : function( construct, name ) {
    var init = this.__initializeClass;
    var wrapper = function() {
      // We can access the class/statics using arguments.callee
      var clazz = arguments.callee.constructor;
      init( clazz );
      // Attach local properties
      if( !clazz.$$propertiesAttached ) {
        jsw.qx.Property.attach( clazz );
      }
      // Execute default constructor
      var retval=clazz.$$original.apply( this, arguments );
      // Initialize local mixins
      if( clazz.$$includes ) {
        var mixins = clazz.$$flatIncludes;
        for( var i = 0, l = mixins.length; i < l; i++ ) {
          if( mixins[ i ].$$constructor ) {
            mixins[ i ].$$constructor.apply( this,arguments );
          }
        }
      }
      // Mark instance as initialized
      if( this.classname === ', name, ' . classname ) {
        this.$$initialized = true;
      }
      // Return optional return value
      return retval;
    };
    // Store original constructor
    wrapper.$$original = construct;
    // Store wrapper into constructor (needed for base calls etc.)
    construct.wrapper = wrapper;
    // Return generated wrapper
    return wrapper;
  }

};
