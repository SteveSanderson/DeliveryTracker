/// <reference path="knockout-2.0.0.debug.js" />

(function () {
    function firstWhere(array, condition) {
        for (var i = 0; i < array.length; i++)
            if (condition(array[i]))
                return array[i];
    }

    ko.observableArray.fn.groupBy = function (keySelector) {
        if (typeof keySelector === "string") {
            var key = keySelector;
            keySelector = function (x) { return ko.utils.unwrapObservable(x[key]) };
        }
        var observableArray = this;

        return ko.computed(function () {
            var groups = [], array = observableArray();
            for (var i = 0; i < array.length; i++) {
                var item = array[i],
                existingGroup = firstWhere(groups, function (g) { return g.key === keySelector(item) });
                if (existingGroup)
                    existingGroup.values.push(item);
                else
                    groups.push({ key: keySelector(item), values: [item] });
            }
            return groups;
        })
    }
})();