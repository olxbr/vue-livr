import requiredIf from './required-if';
import notEmptyListIf from './not-empty-list-if';
import greaterEqThanField from './greater-eq-than-field';
import listOfDifferentNestedObjects from './list-of-different-nested-objects';

export default {
  // LIVR convention - All other rules are in snake_case
  required_if: requiredIf,
  not_empty_list_if: notEmptyListIf,
  greater_eq_than_field: greaterEqThanField,
  list_of_different_nested_objects: listOfDifferentNestedObjects,
};
