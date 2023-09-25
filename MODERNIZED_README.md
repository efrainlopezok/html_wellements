PRODUCT FILTER
--------------

Data for the filter should be fed into category filters through the ‘data-category’ attribute:
<input role="checkbox" aria-checked="false" data-category="0-3 months" name="0-3 months" type=“checkbox">

Products can have any number of categories and should be fed into the ‘data-categories’  as an array attribute of the product, and should match one of the data-category attributes from the filter checkboxes:

<li class="product" data-categories='["remedies", "3 months+", "vitamins"]'>
