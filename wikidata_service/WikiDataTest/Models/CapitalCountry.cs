namespace WikiDataTest.Models
{

    public class CapitalCountry
    {
        public Label capitalLabel { get; set; }
        public Label countryLabel { get; set; }

        public string ToString()
        {
            return countryLabel.value + ": " + capitalLabel.value;
        }
    }
}
