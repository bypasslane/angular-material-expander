# angular-material-expander
Expanding component that follows material design spec and is built to be used with [Angular Material](https://material.angularjs.org)


Quick Links:
* [Installation](#installaton)
* [Building](#building)
* [Usage](#usage)
* [Documentation](#documentation)
* [FAQ](#faq)



## <a name="installation"></a> Installation

#### Bower
Change to your project's root directory.

```bash
# To install latest
bower install angular-material-expander

# To install latest and update bower.json
bower install angular-material-expander --save
```


#### Npm
Change to your project's root directory.

```bash
# To install latest
npm install angular-material-expander

# To install latest and update package.json
npm install angular-material-expander --save
```


#### setup
install modules

```bash
# install npm modules
npm install

# install bower components
bower install
```

Include the `material.components.expander` module as a dependency in your application.

```javascript
// with ngMaterial
angular.module('myApp', ['ngMaterial', 'material.components.expander']);
```



## <a name="building"></a> Building
You can easily build using gulp.

The built files will be created in the `dist` folder

Run the **gulp** tasks:

```bash
# To run test app locally. This will kick of the watch process
# navigate to `localhost:8080`
gulp

# To build the js and css files to the `/build` directory
gulp build
```


## <a name="usage"></a> Usage

**Example**

```html
<md-exapnder
  md-expanded="vm.open" // optional
  width="300px" // optional
  height="200px" // optional
>
  <md-exapnder-header>
    <div class="md-title">header</div>
    <md-expander-arrow></md-expander-arrow>
  </md-exapnder-header>

  <md-expander-expanded>
    <!-- add content without padding -->
    <div class="md-expander-content">
      <p>content</p>
    </div>
  </md-expander-expanded>
</md-exapnder>
```



## <a name="documentation"></a> Documentation

To add Expanders to you angular-material project, include the `material.components.expander` module as a dependency in your application.

```javascript
angular.module('myApp', ['ngMaterial', 'material.components.expander']);
```


* [mdExpander](#mdExpander)
* [mdExpanderHeader](#mdExpanderHeader)
* [mdExpanderExpanded](#mdExpanderExpanded)
* [mdExpanderArrow](#mdExpanderArrow)
* [$mdExpander service](#$mdExpander)


## <a name="mdExpander"></a> mdExpander
```html
<md-exapnder
  [md-expanded=""]
  [width=""]
  [height=""]
>
...
</md-exapnder>
```


#### Attributes
| Param | Type | Details |
| :--: | :--: | :--: |
| md-expanded | boolean? | <p>Optional boolean to control the panel with</p>  |
| height | number? | <p>set height in pixels. If not set the the expander will open to the contents height</p>  |
| width | number? | <p>set width in pixels. If not set then the expander will fill the area</p>  |


## <a name="mdExpanderHeader"></a> mdExpanderHeader
This is an optional element.
```html
<md-exapnder-header
>
...
</md-exapnder-header>
```


## <a name="mdExpanderExpanded"></a> mdExpanderExpanded
You can add a div with the class name `md-expander-content` to get the default padding
```html
<md-exapnder-expanded
>
  <div class="md-expander-content">
    ...
  </div>
...
</md-exapnder-expanded>
```


## <a name="mdExpanderArrow"></a> mdExpanderArrow
This is an optional element. that can be added as the first or last element in the `md-expander-header`
```html
<!-- First -->
<md-exapnder-header>
  <md-exapnder-arrow></md-exapnder-arrow>
  ...
</md-exapnder-header>

<!-- Last -->
<md-exapnder-header>
  ...
  <md-exapnder-arrow></md-exapnder-arrow>
</md-exapnder-header>
```



### Service
## <a name="$mdExpander"></a> $mdExpander Service
Show and Hide expanders using their `md-component-id`.
```javascript
// sync
$mdExpander('theComponentId').show();
$mdExpander('theComponentId').hide();
$mdExpander('theComponentId').isOpen();

// Async
$mdExpander().waitFor('theComponentId').then(function (instance) {
  instance.show();
  instance.hide();
  instance.isOpen();
});
```

#### Methods

### $mdExpander
Get an instance of the expander by its component id
You can use this in 2 ways

- 1. pass in a string id and get back the instance
- 2. call the service and get a service with 2 methods. `Find` witch will do the same as 1. `waitFor` that will return a promise, so you can call on directives before they are added to the dom.

**Parameters**

| Param | Type | Details |
| :--: | :--: | :--: |
| componentId | string= | <p>the component id used on the element</p>  |

**Returns**

| Param | Details |
| :--: | :--: |
| promise/instance | <p>returns a instance or a service with 2 methods</p>  |

**Returned Service**

| Method | Details |
| :--: | :--: |
| find | <p>sync method for getting instance</p>  |
| waitFor | <p>async method for getting instance. this returnes a promise</p>  |


### $mdExpander#show
Show content inside of the `md-expander-expanded` element
```javascript
// sync
$mdExpander('theComponentId').show();

// Async
$mdExpander().waitFor('theComponentId').then(function (instance) {
  instance.show();
});
```

### $mdExpander#hide
Hide content inside of the `md-expander-expanded` element
```javascript
// sync
$mdExpander('theComponentId').hide();

// Async
$mdExpander().waitFor('theComponentId').then(function (instance) {
  instance.hide();
});
```

### $mdExpander#isOpen
Returns `true` if expander is open. Returns `false` if expander is hidden

```javascript
// sync
$mdExpander('theComponentId').isOpen();

// Async
$mdExpander().waitFor('theComponentId').then(function (instance) {
  instance.isOpen();
});
```
