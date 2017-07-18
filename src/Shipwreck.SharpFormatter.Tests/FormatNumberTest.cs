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

            var exp = value.ToString(format, null);
            Console.WriteLine("Testing {0} formatted by \"{1}\" expecting \"{2}\"", value, format, exp);
            var v = value.ToDouble(null);
            var s = _Driver.ExecuteScript(string.Format("return Shipwreck.SharpFormatter.formatNumber({0}, '{1}');",double.IsNaN(v)?"NaN": double.IsPositiveInfinity(v)? "Infinity" : double.IsNegativeInfinity(v)? "-Infinity" :  v.ToString("r"), format));
            Assert.AreEqual(exp, s);
        }

        [ClassCleanup]
        public static void Cleanup()
        {
            _Driver?.Close();
            _Driver = null;
        }

        #region Symbol

        [TestMethod]
        public void FormattNumber_PositiveInfinity()
            => Test(double.PositiveInfinity, "g");

        [TestMethod]
        public void FormattNumber_NegativeInfinity()
            => Test(double.NegativeInfinity, "g");

        [TestMethod]
        public void FormattNumber_NaN()
            => Test(double.NaN, "g");

        #endregion Symbol

        #region C

        [TestMethod]
        public void FormattNumber_C()
            => Test(12.3, "c");

        [TestMethod]
        public void FormattNumber_C2()
            => Test(12.3, "c2");

        [TestMethod]
        public void FormattNumber_C_3Digits()
            => Test(123, "c");

        [TestMethod]
        public void FormattNumber_C_4Digits()
            => Test(1234, "c");

        [TestMethod]
        public void FormattNumber_C_6Digits()
            => Test(123456, "c");

        [TestMethod]
        public void FormattNumber_C_7Digits()
            => Test(1234567, "c");

        #endregion C

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

        [TestMethod]
        public void FormattNumber_D6_Negative()
            => Test(-123, "d6");

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

        #region G

        [TestMethod]
        public void FormattNumber_G()
            => Test(Math.PI, "g");

        [TestMethod]
        public void FormattNumber_G_E_1()
            => Test(Math.PI * Math.Pow(10, 1), "g");

        [TestMethod]
        public void FormattNumber_G_E_2()
            => Test(Math.PI * Math.Pow(10, 2), "g");

        [TestMethod]
        public void FormattNumber_G_E_3()
            => Test(Math.PI * Math.Pow(10, 3), "g");

        [TestMethod]
        public void FormattNumber_G_E_4()
            => Test(Math.PI * Math.Pow(10, 4), "g");

        [TestMethod]
        public void FormattNumber_G_E_5()
            => Test(Math.PI * Math.Pow(10, 5), "g");

        [TestMethod]
        public void FormattNumber_G_E_6()
            => Test(Math.PI * Math.Pow(10, 6), "g");

        [TestMethod]
        public void FormattNumber_G_E_7()
            => Test(Math.PI * Math.Pow(10, 7), "g");

        [TestMethod]
        public void FormattNumber_G_E_8()
            => Test(Math.PI * Math.Pow(10, 8), "g");

        [TestMethod]
        public void FormattNumber_G_E_9()
            => Test(Math.PI * Math.Pow(10, 9), "g");

        [TestMethod]
        public void FormattNumber_G_E_10()
            => Test(Math.PI * Math.Pow(10, 10), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_1()
            => Test(Math.PI * Math.Pow(10, -1), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_2()
            => Test(Math.PI * Math.Pow(10, -2), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_3()
            => Test(Math.PI * Math.Pow(10, -3), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_4()
            => Test(Math.PI * Math.Pow(10, -4), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_5()
            => Test(Math.PI * Math.Pow(10, -5), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_6()
            => Test(Math.PI * Math.Pow(10, -6), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_7()
            => Test(Math.PI * Math.Pow(10, -7), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_8()
            => Test(Math.PI * Math.Pow(10, -8), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_9()
            => Test(Math.PI * Math.Pow(10, -9), "g");

        [TestMethod]
        public void FormattNumber_G_E_Minus_10()
            => Test(Math.PI * Math.Pow(10, -10), "g");

        #endregion G

        #region N

        [TestMethod]
        public void FormattNumber_N_3Digits()
            => Test(432.1, "n");

        [TestMethod]
        public void FormattNumber_N_4Digits()
            => Test(5432.1, "n");

        [TestMethod]
        public void FormattNumber_N_6Digits()
            => Test(765432.1, "n");

        [TestMethod]
        public void FormattNumber_N_7Digits()
            => Test(8765432.1, "n");

        #endregion N

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

        #region X

        [TestMethod]
        public void FormattNumber_X()
            => Test(123, "X");

        [TestMethod]
        public void FormattNumber_X8()
            => Test(0xfe56, "X8");

        [TestMethod]
        public void FormattNumber_x8()
            => Test(0xfe56, "x8");

        #endregion X
    }
}