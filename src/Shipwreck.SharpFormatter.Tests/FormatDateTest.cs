// #define LOCALES

using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Globalization;

namespace Shipwreck.SharpFormatter.Tests
{
    [TestClass]
    public abstract class FormatDateTest
    {
        private void Test(DateTime value, string format)
        {
            var d = DriverHelper.GetDriver(HtmlName);
            var c = Culture;
            var exp = value.ToString(format, c);
            Console.WriteLine("Testing {0} formatted by \"{1}\" expecting \"{2}\" in {3}", value, format, exp, Culture.DisplayName);

            var s = d.ExecuteScript(
                $"var d = new Date({value.Year}, {value.Month - 1}, {value.Day}, {value.Hour}, {value.Minute}, {value.Second}, {value.Millisecond});"
                + $"return Shipwreck.SharpFormatter.formatDate(d, '{format}', {CultureScript});"
                );
            Assert.AreEqual(exp, s);
        }
        private void Test(DateTimeOffset value, string format)
        {
            var d = DriverHelper.GetDriver(HtmlName);
            var c = Culture;
            var exp = value.ToString(format, c);
            Console.WriteLine("Testing {0} formatted by \"{1}\" expecting \"{2}\" in {3}", value, format, exp, Culture.DisplayName);

            var s = d.ExecuteScript(
                $"var d = new Date({value.Year}, {value.Month - 1}, {value.Day}, {value.Hour}, {value.Minute}, {value.Second}, {value.Millisecond});"
                + $" d.getTimezoneOffset = function (){{ return {value.Offset.TotalMinutes} }};"
                + $"return Shipwreck.SharpFormatter.formatDate(d, '{format}', {CultureScript});"
                );
            Assert.AreEqual(exp, s);
        }

        public virtual string HtmlName => "test.html";

        public abstract string CultureName { get; }

        public virtual CultureInfo Culture => CultureInfo.GetCultureInfo(CultureName);

        public virtual string CultureScript => $"Shipwreck.CultureInfo.getCulture('{CultureName}')";

        #region 標準

        [TestMethod]
        public void FormatDate_Standard_d()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "d");

        [TestMethod]
        public void FormatDate_Standard_D()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "D");

        [TestMethod]
        public void FormatDate_Standard_f()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "f");

        [TestMethod]
        public void FormatDate_Standard_F()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "F");

        [TestMethod]
        public void FormatDate_Standard_g()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "g");

        [TestMethod]
        public void FormatDate_Standard_G()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "G");

        [TestMethod]
        public void FormatDate_Standard_m()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "m");

        [TestMethod]
        public void FormatDate_Standard_M()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "M");

        [TestMethod]
        public void FormatDate_Standard_o()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "o");

        [TestMethod]
        public void FormatDate_Standard_O()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "O");

        [TestMethod]
        public void FormatDate_Standard_r()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, DateTimeOffset.Now.Offset), "r");

        [TestMethod]
        public void FormatDate_Standard_R()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, DateTimeOffset.Now.Offset), "R");

        [TestMethod]
        public void FormatDate_Standard_s()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "s");

        [TestMethod]
        public void FormatDate_Standard_t()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "t");

        [TestMethod]
        public void FormatDate_Standard_T()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "T");

        [TestMethod]
        public void FormatDate_Standard_u()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, DateTimeOffset.Now.Offset), "u");

        [TestMethod]
        public void FormatDate_Standard_U()
            => Test(new DateTime(2017, 1, 2, 3, 4, 5, 678), "U");

        [TestMethod]
        public void FormatDate_Standard_y()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "y");

        [TestMethod]
        public void FormatDate_Standard_Y()
            => Test(new DateTimeOffset(2017, 1, 2, 3, 4, 5, 678, TimeSpan.FromMinutes(390)), "Y");

        #endregion 標準
    }

    #region Cultures

    [TestClass]
    public sealed class FormatDateTest_NoCulture : FormatDateTest
    {
        public override string HtmlName => "noculture.html";

        public override string CultureName => string.Empty;

        public override CultureInfo Culture => CultureInfo.InvariantCulture;

        public override string CultureScript
            => "undefined";
    }

    [TestClass]
    public sealed class FormatDateTest_InvariantCulture : FormatDateTest
    {
        public override string CultureName => string.Empty;

        public override CultureInfo Culture => CultureInfo.InvariantCulture;
    }

#if LOCALES

    [TestClass]
    public sealed class CultureFormatDateTest_Aa : FormatDateTest
    {
        public override string CultureName => "aa";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Om : FormatDateTest
    {
        public override string CultureName => "om";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Af : FormatDateTest
    {
        public override string CultureName => "af";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Nr : FormatDateTest
    {
        public override string CultureName => "nr";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ss : FormatDateTest
    {
        public override string CultureName => "ss";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_St : FormatDateTest
    {
        public override string CultureName => "st";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ve : FormatDateTest
    {
        public override string CultureName => "ve";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ak : FormatDateTest
    {
        public override string CultureName => "ak";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Am : FormatDateTest
    {
        public override string CultureName => "am";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ar : FormatDateTest
    {
        public override string CultureName => "ar";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_As : FormatDateTest
    {
        public override string CultureName => "as";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Or : FormatDateTest
    {
        public override string CultureName => "or";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Pa : FormatDateTest
    {
        public override string CultureName => "pa";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ta : FormatDateTest
    {
        public override string CultureName => "ta";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Az : FormatDateTest
    {
        public override string CultureName => "az";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ba : FormatDateTest
    {
        public override string CultureName => "ba";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Be : FormatDateTest
    {
        public override string CultureName => "be";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Bg : FormatDateTest
    {
        public override string CultureName => "bg";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Bm : FormatDateTest
    {
        public override string CultureName => "bm";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Bn : FormatDateTest
    {
        public override string CultureName => "bn";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Bo : FormatDateTest
    {
        public override string CultureName => "bo";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Br : FormatDateTest
    {
        public override string CultureName => "br";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Fr : FormatDateTest
    {
        public override string CultureName => "fr";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Lb : FormatDateTest
    {
        public override string CultureName => "lb";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Lt : FormatDateTest
    {
        public override string CultureName => "lt";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sk : FormatDateTest
    {
        public override string CultureName => "sk";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Bs : FormatDateTest
    {
        public override string CultureName => "bs";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ca : FormatDateTest
    {
        public override string CultureName => "ca";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_El : FormatDateTest
    {
        public override string CultureName => "el";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_It : FormatDateTest
    {
        public override string CultureName => "it";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ce : FormatDateTest
    {
        public override string CultureName => "ce";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Co : FormatDateTest
    {
        public override string CultureName => "co";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Cs : FormatDateTest
    {
        public override string CultureName => "cs";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Cu : FormatDateTest
    {
        public override string CultureName => "cu";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Tt : FormatDateTest
    {
        public override string CultureName => "tt";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Cy : FormatDateTest
    {
        public override string CultureName => "cy";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Gd : FormatDateTest
    {
        public override string CultureName => "gd";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Gv : FormatDateTest
    {
        public override string CultureName => "gv";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Kw : FormatDateTest
    {
        public override string CultureName => "kw";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Da : FormatDateTest
    {
        public override string CultureName => "da";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_De : FormatDateTest
    {
        public override string CultureName => "de";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Es : FormatDateTest
    {
        public override string CultureName => "es";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Gl : FormatDateTest
    {
        public override string CultureName => "gl";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sl : FormatDateTest
    {
        public override string CultureName => "sl";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Dv : FormatDateTest
    {
        public override string CultureName => "dv";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Dz : FormatDateTest
    {
        public override string CultureName => "dz";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ee : FormatDateTest
    {
        public override string CultureName => "ee";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_En : FormatDateTest
    {
        public override string CultureName => "en";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Eo : FormatDateTest
    {
        public override string CultureName => "eo";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Et : FormatDateTest
    {
        public override string CultureName => "et";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Eu : FormatDateTest
    {
        public override string CultureName => "eu";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Fa : FormatDateTest
    {
        public override string CultureName => "fa";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ff : FormatDateTest
    {
        public override string CultureName => "ff";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Fi : FormatDateTest
    {
        public override string CultureName => "fi";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Fo : FormatDateTest
    {
        public override string CultureName => "fo";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Fy : FormatDateTest
    {
        public override string CultureName => "fy";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ga : FormatDateTest
    {
        public override string CultureName => "ga";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Mt : FormatDateTest
    {
        public override string CultureName => "mt";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Gn : FormatDateTest
    {
        public override string CultureName => "gn";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Gu : FormatDateTest
    {
        public override string CultureName => "gu";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Hi : FormatDateTest
    {
        public override string CultureName => "hi";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Te : FormatDateTest
    {
        public override string CultureName => "te";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ha : FormatDateTest
    {
        public override string CultureName => "ha";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_He : FormatDateTest
    {
        public override string CultureName => "he";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Hr : FormatDateTest
    {
        public override string CultureName => "hr";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Hu : FormatDateTest
    {
        public override string CultureName => "hu";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Hy : FormatDateTest
    {
        public override string CultureName => "hy";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ia : FormatDateTest
    {
        public override string CultureName => "ia";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Id : FormatDateTest
    {
        public override string CultureName => "id";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ig : FormatDateTest
    {
        public override string CultureName => "ig";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Yo : FormatDateTest
    {
        public override string CultureName => "yo";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ii : FormatDateTest
    {
        public override string CultureName => "ii";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ug : FormatDateTest
    {
        public override string CultureName => "ug";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Zh : FormatDateTest
    {
        public override string CultureName => "zh";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Is : FormatDateTest
    {
        public override string CultureName => "is";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Iu : FormatDateTest
    {
        public override string CultureName => "iu";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ja : FormatDateTest
    {
        public override string CultureName => "ja";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Jv : FormatDateTest
    {
        public override string CultureName => "jv";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ka : FormatDateTest
    {
        public override string CultureName => "ka";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ki : FormatDateTest
    {
        public override string CultureName => "ki";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sw : FormatDateTest
    {
        public override string CultureName => "sw";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Kk : FormatDateTest
    {
        public override string CultureName => "kk";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Kl : FormatDateTest
    {
        public override string CultureName => "kl";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Km : FormatDateTest
    {
        public override string CultureName => "km";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Kn : FormatDateTest
    {
        public override string CultureName => "kn";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ko : FormatDateTest
    {
        public override string CultureName => "ko";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Kr : FormatDateTest
    {
        public override string CultureName => "kr";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ks : FormatDateTest
    {
        public override string CultureName => "ks";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ku : FormatDateTest
    {
        public override string CultureName => "ku";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ky : FormatDateTest
    {
        public override string CultureName => "ky";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_La : FormatDateTest
    {
        public override string CultureName => "la";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Lg : FormatDateTest
    {
        public override string CultureName => "lg";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ln : FormatDateTest
    {
        public override string CultureName => "ln";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Lo : FormatDateTest
    {
        public override string CultureName => "lo";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Lu : FormatDateTest
    {
        public override string CultureName => "lu";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Lv : FormatDateTest
    {
        public override string CultureName => "lv";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Mg : FormatDateTest
    {
        public override string CultureName => "mg";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Mi : FormatDateTest
    {
        public override string CultureName => "mi";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Mk : FormatDateTest
    {
        public override string CultureName => "mk";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ml : FormatDateTest
    {
        public override string CultureName => "ml";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Mn : FormatDateTest
    {
        public override string CultureName => "mn";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Mr : FormatDateTest
    {
        public override string CultureName => "mr";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ms : FormatDateTest
    {
        public override string CultureName => "ms";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_My : FormatDateTest
    {
        public override string CultureName => "my";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Nb : FormatDateTest
    {
        public override string CultureName => "nb";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_No : FormatDateTest
    {
        public override string CultureName => "no";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Nd : FormatDateTest
    {
        public override string CultureName => "nd";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sn : FormatDateTest
    {
        public override string CultureName => "sn";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ne : FormatDateTest
    {
        public override string CultureName => "ne";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Nl : FormatDateTest
    {
        public override string CultureName => "nl";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Nn : FormatDateTest
    {
        public override string CultureName => "nn";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Oc : FormatDateTest
    {
        public override string CultureName => "oc";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Os : FormatDateTest
    {
        public override string CultureName => "os";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Pl : FormatDateTest
    {
        public override string CultureName => "pl";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ps : FormatDateTest
    {
        public override string CultureName => "ps";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Pt : FormatDateTest
    {
        public override string CultureName => "pt";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Rm : FormatDateTest
    {
        public override string CultureName => "rm";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Rn : FormatDateTest
    {
        public override string CultureName => "rn";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ro : FormatDateTest
    {
        public override string CultureName => "ro";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ru : FormatDateTest
    {
        public override string CultureName => "ru";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Rw : FormatDateTest
    {
        public override string CultureName => "rw";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sa : FormatDateTest
    {
        public override string CultureName => "sa";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sd : FormatDateTest
    {
        public override string CultureName => "sd";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Se : FormatDateTest
    {
        public override string CultureName => "se";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sg : FormatDateTest
    {
        public override string CultureName => "sg";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Si : FormatDateTest
    {
        public override string CultureName => "si";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_So : FormatDateTest
    {
        public override string CultureName => "so";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sq : FormatDateTest
    {
        public override string CultureName => "sq";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sr : FormatDateTest
    {
        public override string CultureName => "sr";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Sv : FormatDateTest
    {
        public override string CultureName => "sv";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Tg : FormatDateTest
    {
        public override string CultureName => "tg";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Th : FormatDateTest
    {
        public override string CultureName => "th";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ti : FormatDateTest
    {
        public override string CultureName => "ti";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Tk : FormatDateTest
    {
        public override string CultureName => "tk";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Tn : FormatDateTest
    {
        public override string CultureName => "tn";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Xh : FormatDateTest
    {
        public override string CultureName => "xh";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_To : FormatDateTest
    {
        public override string CultureName => "to";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Tr : FormatDateTest
    {
        public override string CultureName => "tr";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ts : FormatDateTest
    {
        public override string CultureName => "ts";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Uk : FormatDateTest
    {
        public override string CultureName => "uk";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Ur : FormatDateTest
    {
        public override string CultureName => "ur";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Uz : FormatDateTest
    {
        public override string CultureName => "uz";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Vi : FormatDateTest
    {
        public override string CultureName => "vi";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Vo : FormatDateTest
    {
        public override string CultureName => "vo";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Yi : FormatDateTest
    {
        public override string CultureName => "yi";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Wo : FormatDateTest
    {
        public override string CultureName => "wo";
    }

    [TestClass]
    public sealed class CultureFormatDateTest_Zu : FormatDateTest
    {
        public override string CultureName => "zu";
    }

#endif

    #endregion Cultures
}