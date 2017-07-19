using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.PhantomJS;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.Linq;

namespace Shipwreck.SharpFormatter.Tests
{
    [TestClass]
    public abstract class FormatNumberTest
    {
        private static Dictionary<string, PhantomJSDriver> _Drivers = new Dictionary<string, PhantomJSDriver>();

        private void Test<T>(T value, string format)
            where T : struct, IFormattable, IConvertible
        {
            PhantomJSDriver d;
            if (!_Drivers.TryGetValue(HtmlName, out d))
            {
                d = new PhantomJSDriver();
                d.Navigate().GoToUrl(new Uri(new Uri(GetType().Assembly.Location), HtmlName).ToString());
                _Drivers[HtmlName] = d;
            }

            var c = Culture;
            var exp = value.ToString(format, c);
            Console.WriteLine("Testing {0} formatted by \"{1}\" expecting \"{2}\" in {3}", value, format, exp, Culture.DisplayName);
            var v = value.ToDouble(null);
            var s = d.ExecuteScript(
                string.Format("return Shipwreck.SharpFormatter.formatNumber({0}, '{1}', {2});"
                    , double.IsNaN(v) ? "NaN"
                        : double.IsPositiveInfinity(v) ? "Infinity"
                        : double.IsNegativeInfinity(v) ? "-Infinity"
                        : v.ToString("r"),
                        format, CultureScript));
            Assert.AreEqual(exp, s);
        }

        public virtual string HtmlName => "test.html";

        public abstract string CultureName { get; }

        public virtual CultureInfo Culture => CultureInfo.GetCultureInfo(CultureName);

        public virtual string CultureScript => $"Shipwreck.CultureInfo.getCulture('{CultureName}')";

        [AssemblyCleanup]
        public static void Cleanup()
        {
            foreach (var d in _Drivers.Values)
            {
                try
                {
                    d.Dispose();
                }
                finally { }
            }
            _Drivers.Clear();
        }

        #region Symbol

        [TestMethod]
        public void FormatNumber_PositiveInfinity()
            => Test(double.PositiveInfinity, "g");

        [TestMethod]
        public void FormatNumber_NegativeInfinity()
            => Test(double.NegativeInfinity, "g");

        [TestMethod]
        public void FormatNumber_NaN()
            => Test(double.NaN, "g");

        #endregion Symbol

        #region C

        [TestMethod]
        public void FormatNumber_C()
            => Test(12.3, "c");

        [TestMethod]
        public void FormatNumber_C2()
            => Test(12.3, "c2");

        [TestMethod]
        public void FormatNumber_C_3Digits()
            => Test(123, "c");

        [TestMethod]
        public void FormatNumber_C_4Digits()
            => Test(1234, "c");

        [TestMethod]
        public void FormatNumber_C_6Digits()
            => Test(123456, "c");

        [TestMethod]
        public void FormatNumber_C_7Digits()
            => Test(1234567, "c");

        [TestMethod]
        public void FormatNumber_C_Negative()
            => Test(-1234, "c");

        #endregion C

        #region D

        [TestMethod]
        public void FormatNumber_D()
            => Test(123, "d");

        [TestMethod]
        public void FormatNumber_D2()
            => Test(123, "d2");

        [TestMethod]
        public void FormatNumber_D6()
            => Test(123, "d6");

        [TestMethod]
        public void FormatNumber_D6_Negative()
            => Test(-123, "d6");

        #endregion D

        #region E

        [TestMethod]
        public void FormatNumber_E()
            => Test(Math.PI * Math.Pow(2, 48), "e");

        [TestMethod]
        public void FormatNumber_E3()
            => Test(Math.PI * Math.Pow(2, 48), "e3");

        [TestMethod]
        public void FormatNumber_E20()
            => Test(Math.PI * Math.Pow(2, 48), "e20");

        #endregion E

        #region F

        [TestMethod]
        public void FormatNumber_F()
            => Test(Math.PI, "f");

        [TestMethod]
        public void FormatNumber_F3()
            => Test(Math.PI, "f3");

        [TestMethod]
        public void FormatNumber_F6()
            => Test(Math.PI, "f6");

        #endregion F

        #region G

        [TestMethod]
        public void FormatNumber_G()
            => Test(Math.PI, "g");

        [TestMethod]
        public void FormatNumber_G_E_1()
            => Test(Math.PI * Math.Pow(10, 1), "g");

        [TestMethod]
        public void FormatNumber_G_E_2()
            => Test(Math.PI * Math.Pow(10, 2), "g");

        [TestMethod]
        public void FormatNumber_G_E_3()
            => Test(Math.PI * Math.Pow(10, 3), "g");

        [TestMethod]
        public void FormatNumber_G_E_4()
            => Test(Math.PI * Math.Pow(10, 4), "g");

        [TestMethod]
        public void FormatNumber_G_E_5()
            => Test(Math.PI * Math.Pow(10, 5), "g");

        [TestMethod]
        public void FormatNumber_G_E_6()
            => Test(Math.PI * Math.Pow(10, 6), "g");

        [TestMethod]
        public void FormatNumber_G_E_7()
            => Test(Math.PI * Math.Pow(10, 7), "g");

        [TestMethod]
        public void FormatNumber_G_E_8()
            => Test(Math.PI * Math.Pow(10, 8), "g");

        [TestMethod]
        public void FormatNumber_G_E_9()
            => Test(Math.PI * Math.Pow(10, 9), "g");

        [TestMethod]
        public void FormatNumber_G_E_10()
            => Test(Math.PI * Math.Pow(10, 10), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_1()
            => Test(Math.PI * Math.Pow(10, -1), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_2()
            => Test(Math.PI * Math.Pow(10, -2), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_3()
            => Test(Math.PI * Math.Pow(10, -3), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_4()
            => Test(Math.PI * Math.Pow(10, -4), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_5()
            => Test(Math.PI * Math.Pow(10, -5), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_6()
            => Test(Math.PI * Math.Pow(10, -6), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_7()
            => Test(Math.PI * Math.Pow(10, -7), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_8()
            => Test(Math.PI * Math.Pow(10, -8), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_9()
            => Test(Math.PI * Math.Pow(10, -9), "g");

        [TestMethod]
        public void FormatNumber_G_E_Minus_10()
            => Test(Math.PI * Math.Pow(10, -10), "g");

        #endregion G

        #region N

        [TestMethod]
        public void FormatNumber_N_3Digits()
            => Test(432.1, "n");

        [TestMethod]
        public void FormatNumber_N_4Digits()
            => Test(5432.1, "n");

        [TestMethod]
        public void FormatNumber_N_6Digits()
            => Test(765432.1, "n");

        [TestMethod]
        public void FormatNumber_N_7Digits()
            => Test(8765432.1, "n");

        #endregion N

        #region P

        [TestMethod]
        public void FormatNumber_P()
            => Test(Math.PI / 10, "p");

        [TestMethod]
        public void FormatNumber_P3()
            => Test(Math.PI / 10, "p3");

        [TestMethod]
        public void FormatNumber_P6()
            => Test(Math.PI / 10, "p6");

        [TestMethod]
        public void FormatNumber_P_Comma()
            => Test(Math.PI * 10, "p");

        [TestMethod]
        public void FormatNumber_P3_Comma()
            => Test(Math.PI * 10, "p3");

        [TestMethod]
        public void FormatNumber_P6_Comma()
            => Test(Math.PI * 10, "p6");

        #endregion P

        #region X

        [TestMethod]
        public void FormatNumber_X()
            => Test(123, "X");

        [TestMethod]
        public void FormatNumber_X8()
            => Test(0xfe56, "X8");

        [TestMethod]
        public void FormatNumber_x8()
            => Test(0xfe56, "x8");

        #endregion X
    }

    #region Cultures

    [TestClass]
    public sealed class FormatNumberTest_NoCulture : FormatNumberTest
    {
        public override string HtmlName => "noculture.html";

        public override string CultureName => string.Empty;

        public override CultureInfo Culture => CultureInfo.InvariantCulture;

        public override string CultureScript
            => "undefined";
    }

    [TestClass]
    public sealed class FormatNumberTest_InvariantCulture : FormatNumberTest
    {
        public override string CultureName => string.Empty;

        public override CultureInfo Culture => CultureInfo.InvariantCulture;
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Aa : FormatNumberTest
    {
        public override string CultureName => "aa";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Om : FormatNumberTest
    {
        public override string CultureName => "om";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Af : FormatNumberTest
    {
        public override string CultureName => "af";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Nr : FormatNumberTest
    {
        public override string CultureName => "nr";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ss : FormatNumberTest
    {
        public override string CultureName => "ss";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_St : FormatNumberTest
    {
        public override string CultureName => "st";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ve : FormatNumberTest
    {
        public override string CultureName => "ve";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ak : FormatNumberTest
    {
        public override string CultureName => "ak";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Am : FormatNumberTest
    {
        public override string CultureName => "am";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ar : FormatNumberTest
    {
        public override string CultureName => "ar";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_As : FormatNumberTest
    {
        public override string CultureName => "as";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Or : FormatNumberTest
    {
        public override string CultureName => "or";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Pa : FormatNumberTest
    {
        public override string CultureName => "pa";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ta : FormatNumberTest
    {
        public override string CultureName => "ta";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Az : FormatNumberTest
    {
        public override string CultureName => "az";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ba : FormatNumberTest
    {
        public override string CultureName => "ba";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Be : FormatNumberTest
    {
        public override string CultureName => "be";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Bg : FormatNumberTest
    {
        public override string CultureName => "bg";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Bm : FormatNumberTest
    {
        public override string CultureName => "bm";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Bn : FormatNumberTest
    {
        public override string CultureName => "bn";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Bo : FormatNumberTest
    {
        public override string CultureName => "bo";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Br : FormatNumberTest
    {
        public override string CultureName => "br";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Fr : FormatNumberTest
    {
        public override string CultureName => "fr";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Lb : FormatNumberTest
    {
        public override string CultureName => "lb";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Lt : FormatNumberTest
    {
        public override string CultureName => "lt";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sk : FormatNumberTest
    {
        public override string CultureName => "sk";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Bs : FormatNumberTest
    {
        public override string CultureName => "bs";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ca : FormatNumberTest
    {
        public override string CultureName => "ca";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_El : FormatNumberTest
    {
        public override string CultureName => "el";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_It : FormatNumberTest
    {
        public override string CultureName => "it";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ce : FormatNumberTest
    {
        public override string CultureName => "ce";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Co : FormatNumberTest
    {
        public override string CultureName => "co";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Cs : FormatNumberTest
    {
        public override string CultureName => "cs";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Cu : FormatNumberTest
    {
        public override string CultureName => "cu";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Tt : FormatNumberTest
    {
        public override string CultureName => "tt";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Cy : FormatNumberTest
    {
        public override string CultureName => "cy";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Gd : FormatNumberTest
    {
        public override string CultureName => "gd";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Gv : FormatNumberTest
    {
        public override string CultureName => "gv";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Kw : FormatNumberTest
    {
        public override string CultureName => "kw";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Da : FormatNumberTest
    {
        public override string CultureName => "da";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_De : FormatNumberTest
    {
        public override string CultureName => "de";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Es : FormatNumberTest
    {
        public override string CultureName => "es";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Gl : FormatNumberTest
    {
        public override string CultureName => "gl";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sl : FormatNumberTest
    {
        public override string CultureName => "sl";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Dv : FormatNumberTest
    {
        public override string CultureName => "dv";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Dz : FormatNumberTest
    {
        public override string CultureName => "dz";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ee : FormatNumberTest
    {
        public override string CultureName => "ee";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_En : FormatNumberTest
    {
        public override string CultureName => "en";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Eo : FormatNumberTest
    {
        public override string CultureName => "eo";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Et : FormatNumberTest
    {
        public override string CultureName => "et";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Eu : FormatNumberTest
    {
        public override string CultureName => "eu";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Fa : FormatNumberTest
    {
        public override string CultureName => "fa";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ff : FormatNumberTest
    {
        public override string CultureName => "ff";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Fi : FormatNumberTest
    {
        public override string CultureName => "fi";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Fo : FormatNumberTest
    {
        public override string CultureName => "fo";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Fy : FormatNumberTest
    {
        public override string CultureName => "fy";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ga : FormatNumberTest
    {
        public override string CultureName => "ga";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Mt : FormatNumberTest
    {
        public override string CultureName => "mt";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Gn : FormatNumberTest
    {
        public override string CultureName => "gn";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Gu : FormatNumberTest
    {
        public override string CultureName => "gu";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Hi : FormatNumberTest
    {
        public override string CultureName => "hi";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Te : FormatNumberTest
    {
        public override string CultureName => "te";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ha : FormatNumberTest
    {
        public override string CultureName => "ha";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_He : FormatNumberTest
    {
        public override string CultureName => "he";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Hr : FormatNumberTest
    {
        public override string CultureName => "hr";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Hu : FormatNumberTest
    {
        public override string CultureName => "hu";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Hy : FormatNumberTest
    {
        public override string CultureName => "hy";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ia : FormatNumberTest
    {
        public override string CultureName => "ia";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Id : FormatNumberTest
    {
        public override string CultureName => "id";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ig : FormatNumberTest
    {
        public override string CultureName => "ig";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Yo : FormatNumberTest
    {
        public override string CultureName => "yo";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ii : FormatNumberTest
    {
        public override string CultureName => "ii";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ug : FormatNumberTest
    {
        public override string CultureName => "ug";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Zh : FormatNumberTest
    {
        public override string CultureName => "zh";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Is : FormatNumberTest
    {
        public override string CultureName => "is";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Iu : FormatNumberTest
    {
        public override string CultureName => "iu";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ja : FormatNumberTest
    {
        public override string CultureName => "ja";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Jv : FormatNumberTest
    {
        public override string CultureName => "jv";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ka : FormatNumberTest
    {
        public override string CultureName => "ka";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ki : FormatNumberTest
    {
        public override string CultureName => "ki";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sw : FormatNumberTest
    {
        public override string CultureName => "sw";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Kk : FormatNumberTest
    {
        public override string CultureName => "kk";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Kl : FormatNumberTest
    {
        public override string CultureName => "kl";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Km : FormatNumberTest
    {
        public override string CultureName => "km";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Kn : FormatNumberTest
    {
        public override string CultureName => "kn";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ko : FormatNumberTest
    {
        public override string CultureName => "ko";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Kr : FormatNumberTest
    {
        public override string CultureName => "kr";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ks : FormatNumberTest
    {
        public override string CultureName => "ks";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ku : FormatNumberTest
    {
        public override string CultureName => "ku";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ky : FormatNumberTest
    {
        public override string CultureName => "ky";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_La : FormatNumberTest
    {
        public override string CultureName => "la";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Lg : FormatNumberTest
    {
        public override string CultureName => "lg";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ln : FormatNumberTest
    {
        public override string CultureName => "ln";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Lo : FormatNumberTest
    {
        public override string CultureName => "lo";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Lu : FormatNumberTest
    {
        public override string CultureName => "lu";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Lv : FormatNumberTest
    {
        public override string CultureName => "lv";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Mg : FormatNumberTest
    {
        public override string CultureName => "mg";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Mi : FormatNumberTest
    {
        public override string CultureName => "mi";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Mk : FormatNumberTest
    {
        public override string CultureName => "mk";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ml : FormatNumberTest
    {
        public override string CultureName => "ml";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Mn : FormatNumberTest
    {
        public override string CultureName => "mn";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Mr : FormatNumberTest
    {
        public override string CultureName => "mr";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ms : FormatNumberTest
    {
        public override string CultureName => "ms";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_My : FormatNumberTest
    {
        public override string CultureName => "my";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Nb : FormatNumberTest
    {
        public override string CultureName => "nb";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_No : FormatNumberTest
    {
        public override string CultureName => "no";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Nd : FormatNumberTest
    {
        public override string CultureName => "nd";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sn : FormatNumberTest
    {
        public override string CultureName => "sn";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ne : FormatNumberTest
    {
        public override string CultureName => "ne";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Nl : FormatNumberTest
    {
        public override string CultureName => "nl";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Nn : FormatNumberTest
    {
        public override string CultureName => "nn";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Oc : FormatNumberTest
    {
        public override string CultureName => "oc";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Os : FormatNumberTest
    {
        public override string CultureName => "os";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Pl : FormatNumberTest
    {
        public override string CultureName => "pl";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ps : FormatNumberTest
    {
        public override string CultureName => "ps";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Pt : FormatNumberTest
    {
        public override string CultureName => "pt";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Rm : FormatNumberTest
    {
        public override string CultureName => "rm";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Rn : FormatNumberTest
    {
        public override string CultureName => "rn";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ro : FormatNumberTest
    {
        public override string CultureName => "ro";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ru : FormatNumberTest
    {
        public override string CultureName => "ru";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Rw : FormatNumberTest
    {
        public override string CultureName => "rw";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sa : FormatNumberTest
    {
        public override string CultureName => "sa";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sd : FormatNumberTest
    {
        public override string CultureName => "sd";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Se : FormatNumberTest
    {
        public override string CultureName => "se";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sg : FormatNumberTest
    {
        public override string CultureName => "sg";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Si : FormatNumberTest
    {
        public override string CultureName => "si";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_So : FormatNumberTest
    {
        public override string CultureName => "so";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sq : FormatNumberTest
    {
        public override string CultureName => "sq";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sr : FormatNumberTest
    {
        public override string CultureName => "sr";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Sv : FormatNumberTest
    {
        public override string CultureName => "sv";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Tg : FormatNumberTest
    {
        public override string CultureName => "tg";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Th : FormatNumberTest
    {
        public override string CultureName => "th";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ti : FormatNumberTest
    {
        public override string CultureName => "ti";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Tk : FormatNumberTest
    {
        public override string CultureName => "tk";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Tn : FormatNumberTest
    {
        public override string CultureName => "tn";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Xh : FormatNumberTest
    {
        public override string CultureName => "xh";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_To : FormatNumberTest
    {
        public override string CultureName => "to";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Tr : FormatNumberTest
    {
        public override string CultureName => "tr";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ts : FormatNumberTest
    {
        public override string CultureName => "ts";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Uk : FormatNumberTest
    {
        public override string CultureName => "uk";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Ur : FormatNumberTest
    {
        public override string CultureName => "ur";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Uz : FormatNumberTest
    {
        public override string CultureName => "uz";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Vi : FormatNumberTest
    {
        public override string CultureName => "vi";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Vo : FormatNumberTest
    {
        public override string CultureName => "vo";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Yi : FormatNumberTest
    {
        public override string CultureName => "yi";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Wo : FormatNumberTest
    {
        public override string CultureName => "wo";
    }

    [TestClass]
    public sealed class CultureFormatNumberTest_Zu : FormatNumberTest
    {
        public override string CultureName => "zu";
    }

    #endregion Cultures
}