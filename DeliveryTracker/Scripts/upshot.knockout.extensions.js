// Copyright (c) Microsoft.  All rights reserved.
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
// files (the "Software"), to deal  in the Software without restriction, including without limitation the rights  to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// WARRANTIES OF MERCHANTABILITY,  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


(function (ko, upshot, undefined) {
    upshot.RemoteDataSource.prototype.findById = function (id, updateTarget) {
        function search() {
            var self = this;
            var foundEntity = $.grep(ko.utils.unwrapObservable(self.getEntities()), function (entity) {
                return self.getEntityId(entity) === updateTarget._id;
            })[0];
            updateTarget(foundEntity);
        }

        if (!('_id' in updateTarget)) {
            // TODO: What is the provision to 'unbind' here?
            this.bind("refreshSuccess", search);
        }
        updateTarget._id = id;
        search.call(this);
    };

    ko.bindingHandlers.autovalidate = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            if (ko.utils.unwrapObservable(valueAccessor()) !== false) {
                // Establish a dependency on any value/checked/selectedOptions observable value
                var allBindings = allBindingsAccessor();
                var respondAfterBinding = allBindings.value || allBindings.checked || allBindings.selectedOptions;
                ko.utils.unwrapObservable(respondAfterBinding);

                // Cause jQuery Validation to revalidate this form element
                $(element).trigger("focusout");
            }
        }
    };

    ko.bindingHandlers.validate = {
        init: function (element, valueAccessor) {
            // Apply the validation configuration to the form
            var config = valueAccessor();
            $(element).validate().settings = $.extend(true, {}, $.validator.defaults, config);
            // Todo: replace above line with "$(element).validate(config);" after Beta
        },
        update: function (element, valueAccessor) {
            // Respond to any 'resetFormOnChange' value by removing any error messages
            ko.utils.unwrapObservable(valueAccessor().resetFormOnChange);
            $(element).validate().resetForm();
        }
    };
}
)(ko, upshot);