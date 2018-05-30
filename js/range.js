angular.module('MyApp',['ngMaterial', 'ngMessages'])
    .controller('AppCtrl', function($scope, $http) {
        let url = 'http://localhost:3035';
        function apiValue() {
            return $http({
                method: 'GET',
                url: url,
                headers: {"Accept":"application/json, text/plain, */*"},
                dataType: 'json',
            }).
            then(function(response) {
                $scope.customers = response.data;

                //filter payment through date
                let startDate = new Date("2017-01-01");
                let endDate = new Date();

                let resultFilter = $scope.customers.filter(function (payment) {
                    let date = new Date(payment.customer.createdAt);
                    return (date >= startDate && date <= endDate);
                });
                const CustomerTotalAmnt = resultFilter.map(index => index.total_transaction_amount);

                //sorting array of total transaction in descending order
                function sortAmnt(arr) {
                    return arr.sort(function(a, b) {
                        return b - a;
                    });
                }

                const DesCustomerTotalAmnt = sortAmnt(CustomerTotalAmnt);
                $scope.min = 1;
                $scope.max = DesCustomerTotalAmnt.length;

                //reduce for arrays of total sum
                const sumDesCustomerTotalAmnt = DesCustomerTotalAmnt.reduce(function(acc, val) { return acc + val; });

                //convert the sum of total transaction amount to percentage
                $scope.sliderValueChanged = function () {
                    let sliderVal = $scope.sliderValue;
                    let total = 0;
                    let sumTotalAmt = DesCustomerTotalAmnt;
                    for (let i = 0; i < sliderVal; i++)
                    {
                        total += sumTotalAmt[i];
                    }
                    $scope.sliderValuePercentage = (Number((total/sumDesCustomerTotalAmnt).toPrecision(5))) * 100
                };
                $scope.sliderValueChanged()
            });
        }
        apiValue();
    });