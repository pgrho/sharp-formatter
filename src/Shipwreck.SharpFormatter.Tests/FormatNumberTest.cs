using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.PhantomJS;
using System;

namespace Shipwreck.SharpFormatter.Tests
{
    [TestClass]
    public class FormatNumberTest
    {
        private static PhantomJSDriver _Driver;

        private PhantomJSDriver CreateWebDriver()
        {
            var d = new PhantomJSDriver();
            d.Navigate().GoToUrl(new Uri(new Uri(GetType().Assembly.Location), "test.html").ToString());
            return d;
        }

        private void Test<T>(T value, string format)
            where T : struct, IFormattable, IConvertible
        {
            if (_Driver == null)
            {
                _Driver = CreateWebDriver();
            }

            var s = _Driver.ExecuteScript(string.Format("return Shipwreck.SharpFormatter.formatNumber({0:r}, '{1}');", value.ToDouble(null), format));
            var exp = value.ToString(format, null);
            Console.WriteLine("Testing {0} formatted by \"{1}\" expecting \"{2}\"", value, format, exp);
            Assert.AreEqual(exp, s);
        }

        [ClassCleanup]
        public static void Cleanup()
        {
            _Driver?.Close();
            _Driver = null;
        }

        #region D

        [TestMethod]
        public void FormattNumber_D()
            => Test(123, "d");

        [TestMethod]
        public void FormattNumber_D2()
            => Test(123, "d2");

        [TestMethod]
        public void FormattNumber_D6()
            => Test(123, "d6");

        #endregion D

        #region E

        [TestMethod]
        public void FormattNumber_E()
            => Test(Math.PI * Math.Pow(2, 48), "e");

        [TestMethod]
        public void FormattNumber_E3()
            => Test(Math.PI * Math.Pow(2, 48), "e3");

        [TestMethod]
        public void FormattNumber_E20()
            => Test(Math.PI * Math.Pow(2, 48), "e20");

        #endregion E

        #region F

        [TestMethod]
        public void FormattNumber_F()
            => Test(Math.PI, "f");

        [TestMethod]
        public void FormattNumber_F3()
            => Test(Math.PI, "f3");

        [TestMethod]
        public void FormattNumber_F6()
            => Test(Math.PI, "f6");

        #endregion F

        #region P

        [TestMethod]
        public void FormattNumber_P()
            => Test(Math.PI / 10, "p");

        [TestMethod]
        public void FormattNumber_P3()
            => Test(Math.PI / 10, "p3");

        [TestMethod]
        public void FormattNumber_P6()
            => Test(Math.PI / 10, "p6");

        [TestMethod]
        public void FormattNumber_P_Comma()
            => Test(Math.PI * 10, "p");

        [TestMethod]
        public void FormattNumber_P3_Comma()
            => Test(Math.PI * 10, "p3");

        [TestMethod]
        public void FormattNumber_P6_Comma()
            => Test(Math.PI * 10, "p6");

        #endregion P
    }
}