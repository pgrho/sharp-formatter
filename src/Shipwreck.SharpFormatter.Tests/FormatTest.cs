#define LOCALES

using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Globalization;
using System.Linq;

namespace Shipwreck.SharpFormatter.Tests
{
    [TestClass]
    public abstract class FormatTest
    {
        private void Test<T>(string format, T value)
        {
            var d = DriverHelper.GetDriver(HtmlName);
            var c = Culture;
            var exp = string.Format(c, format, value);
            // Console.WriteLine("Testing {0} formatted by \"{1}\" expecting \"{2}\" in {3}", value,
            // format, exp, Culture.DisplayName);
            var s = d.ExecuteScript(
                string.Format("return Shipwreck.SharpFormatter.format('{0}', {1}, {2});"
                        , format, CreateArray(value), CultureScript));
            Assert.AreEqual(exp, s);
        }

        private static string CreateArray(params object[] values)
            => "[" + string.Join(", ", values.Select(v =>
            {
                if (v == null)
                {
                    return "null";
                }
                else if (v is string)
                {
                    return $"\"{v}\"";
                }
                return ((IConvertible)v).ToDouble(null).ToString("r");
            })) + "]";

        public virtual string HtmlName => "test.html";

        public abstract string CultureName { get; }

        public virtual CultureInfo Culture => CultureInfo.GetCultureInfo(CultureName);

        public virtual string CultureScript => $"Shipwreck.CultureInfo.getCulture('{CultureName}')";

        #region Single

        [TestMethod]
        public void Format_Simple()
            => Test("{0}", 1);

        [TestMethod]
        public void Format_Prefix()
            => Test("a{0}", 1);

        [TestMethod]
        public void Format_Suffix()
            => Test("{0}b", 1);

        [TestMethod]
        public void Format_PositiveAlignment()
            => Test("{0,2}", 1);

        [TestMethod]
        public void Format_NegativeAlignment()
            => Test("{0,-2}", 1);

        [TestMethod]
        public void Format_Format()
            => Test("{0:abc}", 1);

        [TestMethod]
        public void Format_Alignment_Format()
            => Test("{0,5:abc}", 1);

        [TestMethod]
        public void Format_Local()
            => Test("{0:N}", 1234.567);

        #endregion Single
    }

    #region Cultures

    [TestClass]
    public sealed class FormatTest_NoCulture : FormatTest
    {
        public override string HtmlName => "noculture.html";

        public override string CultureName => string.Empty;

        public override CultureInfo Culture => CultureInfo.InvariantCulture;

        public override string CultureScript
            => "undefined";
    }

    [TestClass]
    public sealed class FormatTest_InvariantCulture : FormatTest
    {
        public override string CultureName => string.Empty;

        public override CultureInfo Culture => CultureInfo.InvariantCulture;
    }

#if LOCALES

    [TestClass]
    public sealed class CultureFormatTest_Aa : FormatTest
    {
        public override string CultureName => "aa";
    }

    [TestClass]
    public sealed class CultureFormatTest_Om : FormatTest
    {
        public override string CultureName => "om";
    }

    [TestClass]
    public sealed class CultureFormatTest_Af : FormatTest
    {
        public override string CultureName => "af";
    }

    [TestClass]
    public sealed class CultureFormatTest_Nr : FormatTest
    {
        public override string CultureName => "nr";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ss : FormatTest
    {
        public override string CultureName => "ss";
    }

    [TestClass]
    public sealed class CultureFormatTest_St : FormatTest
    {
        public override string CultureName => "st";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ve : FormatTest
    {
        public override string CultureName => "ve";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ak : FormatTest
    {
        public override string CultureName => "ak";
    }

    [TestClass]
    public sealed class CultureFormatTest_Am : FormatTest
    {
        public override string CultureName => "am";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ar : FormatTest
    {
        public override string CultureName => "ar";
    }

    [TestClass]
    public sealed class CultureFormatTest_As : FormatTest
    {
        public override string CultureName => "as";
    }

    [TestClass]
    public sealed class CultureFormatTest_Or : FormatTest
    {
        public override string CultureName => "or";
    }

    [TestClass]
    public sealed class CultureFormatTest_Pa : FormatTest
    {
        public override string CultureName => "pa";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ta : FormatTest
    {
        public override string CultureName => "ta";
    }

    [TestClass]
    public sealed class CultureFormatTest_Az : FormatTest
    {
        public override string CultureName => "az";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ba : FormatTest
    {
        public override string CultureName => "ba";
    }

    [TestClass]
    public sealed class CultureFormatTest_Be : FormatTest
    {
        public override string CultureName => "be";
    }

    [TestClass]
    public sealed class CultureFormatTest_Bg : FormatTest
    {
        public override string CultureName => "bg";
    }

    [TestClass]
    public sealed class CultureFormatTest_Bm : FormatTest
    {
        public override string CultureName => "bm";
    }

    [TestClass]
    public sealed class CultureFormatTest_Bn : FormatTest
    {
        public override string CultureName => "bn";
    }

    [TestClass]
    public sealed class CultureFormatTest_Bo : FormatTest
    {
        public override string CultureName => "bo";
    }

    [TestClass]
    public sealed class CultureFormatTest_Br : FormatTest
    {
        public override string CultureName => "br";
    }

    [TestClass]
    public sealed class CultureFormatTest_Fr : FormatTest
    {
        public override string CultureName => "fr";
    }

    [TestClass]
    public sealed class CultureFormatTest_Lb : FormatTest
    {
        public override string CultureName => "lb";
    }

    [TestClass]
    public sealed class CultureFormatTest_Lt : FormatTest
    {
        public override string CultureName => "lt";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sk : FormatTest
    {
        public override string CultureName => "sk";
    }

    [TestClass]
    public sealed class CultureFormatTest_Bs : FormatTest
    {
        public override string CultureName => "bs";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ca : FormatTest
    {
        public override string CultureName => "ca";
    }

    [TestClass]
    public sealed class CultureFormatTest_El : FormatTest
    {
        public override string CultureName => "el";
    }

    [TestClass]
    public sealed class CultureFormatTest_It : FormatTest
    {
        public override string CultureName => "it";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ce : FormatTest
    {
        public override string CultureName => "ce";
    }

    [TestClass]
    public sealed class CultureFormatTest_Co : FormatTest
    {
        public override string CultureName => "co";
    }

    [TestClass]
    public sealed class CultureFormatTest_Cs : FormatTest
    {
        public override string CultureName => "cs";
    }

    [TestClass]
    public sealed class CultureFormatTest_Cu : FormatTest
    {
        public override string CultureName => "cu";
    }

    [TestClass]
    public sealed class CultureFormatTest_Tt : FormatTest
    {
        public override string CultureName => "tt";
    }

    [TestClass]
    public sealed class CultureFormatTest_Cy : FormatTest
    {
        public override string CultureName => "cy";
    }

    [TestClass]
    public sealed class CultureFormatTest_Gd : FormatTest
    {
        public override string CultureName => "gd";
    }

    [TestClass]
    public sealed class CultureFormatTest_Gv : FormatTest
    {
        public override string CultureName => "gv";
    }

    [TestClass]
    public sealed class CultureFormatTest_Kw : FormatTest
    {
        public override string CultureName => "kw";
    }

    [TestClass]
    public sealed class CultureFormatTest_Da : FormatTest
    {
        public override string CultureName => "da";
    }

    [TestClass]
    public sealed class CultureFormatTest_De : FormatTest
    {
        public override string CultureName => "de";
    }

    [TestClass]
    public sealed class CultureFormatTest_Es : FormatTest
    {
        public override string CultureName => "es";
    }

    [TestClass]
    public sealed class CultureFormatTest_Gl : FormatTest
    {
        public override string CultureName => "gl";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sl : FormatTest
    {
        public override string CultureName => "sl";
    }

    [TestClass]
    public sealed class CultureFormatTest_Dv : FormatTest
    {
        public override string CultureName => "dv";
    }

    [TestClass]
    public sealed class CultureFormatTest_Dz : FormatTest
    {
        public override string CultureName => "dz";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ee : FormatTest
    {
        public override string CultureName => "ee";
    }

    [TestClass]
    public sealed class CultureFormatTest_En : FormatTest
    {
        public override string CultureName => "en";
    }

    [TestClass]
    public sealed class CultureFormatTest_Eo : FormatTest
    {
        public override string CultureName => "eo";
    }

    [TestClass]
    public sealed class CultureFormatTest_Et : FormatTest
    {
        public override string CultureName => "et";
    }

    [TestClass]
    public sealed class CultureFormatTest_Eu : FormatTest
    {
        public override string CultureName => "eu";
    }

    [TestClass]
    public sealed class CultureFormatTest_Fa : FormatTest
    {
        public override string CultureName => "fa";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ff : FormatTest
    {
        public override string CultureName => "ff";
    }

    [TestClass]
    public sealed class CultureFormatTest_Fi : FormatTest
    {
        public override string CultureName => "fi";
    }

    [TestClass]
    public sealed class CultureFormatTest_Fo : FormatTest
    {
        public override string CultureName => "fo";
    }

    [TestClass]
    public sealed class CultureFormatTest_Fy : FormatTest
    {
        public override string CultureName => "fy";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ga : FormatTest
    {
        public override string CultureName => "ga";
    }

    [TestClass]
    public sealed class CultureFormatTest_Mt : FormatTest
    {
        public override string CultureName => "mt";
    }

    [TestClass]
    public sealed class CultureFormatTest_Gn : FormatTest
    {
        public override string CultureName => "gn";
    }

    [TestClass]
    public sealed class CultureFormatTest_Gu : FormatTest
    {
        public override string CultureName => "gu";
    }

    [TestClass]
    public sealed class CultureFormatTest_Hi : FormatTest
    {
        public override string CultureName => "hi";
    }

    [TestClass]
    public sealed class CultureFormatTest_Te : FormatTest
    {
        public override string CultureName => "te";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ha : FormatTest
    {
        public override string CultureName => "ha";
    }

    [TestClass]
    public sealed class CultureFormatTest_He : FormatTest
    {
        public override string CultureName => "he";
    }

    [TestClass]
    public sealed class CultureFormatTest_Hr : FormatTest
    {
        public override string CultureName => "hr";
    }

    [TestClass]
    public sealed class CultureFormatTest_Hu : FormatTest
    {
        public override string CultureName => "hu";
    }

    [TestClass]
    public sealed class CultureFormatTest_Hy : FormatTest
    {
        public override string CultureName => "hy";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ia : FormatTest
    {
        public override string CultureName => "ia";
    }

    [TestClass]
    public sealed class CultureFormatTest_Id : FormatTest
    {
        public override string CultureName => "id";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ig : FormatTest
    {
        public override string CultureName => "ig";
    }

    [TestClass]
    public sealed class CultureFormatTest_Yo : FormatTest
    {
        public override string CultureName => "yo";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ii : FormatTest
    {
        public override string CultureName => "ii";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ug : FormatTest
    {
        public override string CultureName => "ug";
    }

    [TestClass]
    public sealed class CultureFormatTest_Zh : FormatTest
    {
        public override string CultureName => "zh";
    }

    [TestClass]
    public sealed class CultureFormatTest_Is : FormatTest
    {
        public override string CultureName => "is";
    }

    [TestClass]
    public sealed class CultureFormatTest_Iu : FormatTest
    {
        public override string CultureName => "iu";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ja : FormatTest
    {
        public override string CultureName => "ja";
    }

    [TestClass]
    public sealed class CultureFormatTest_Jv : FormatTest
    {
        public override string CultureName => "jv";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ka : FormatTest
    {
        public override string CultureName => "ka";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ki : FormatTest
    {
        public override string CultureName => "ki";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sw : FormatTest
    {
        public override string CultureName => "sw";
    }

    [TestClass]
    public sealed class CultureFormatTest_Kk : FormatTest
    {
        public override string CultureName => "kk";
    }

    [TestClass]
    public sealed class CultureFormatTest_Kl : FormatTest
    {
        public override string CultureName => "kl";
    }

    [TestClass]
    public sealed class CultureFormatTest_Km : FormatTest
    {
        public override string CultureName => "km";
    }

    [TestClass]
    public sealed class CultureFormatTest_Kn : FormatTest
    {
        public override string CultureName => "kn";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ko : FormatTest
    {
        public override string CultureName => "ko";
    }

    [TestClass]
    public sealed class CultureFormatTest_Kr : FormatTest
    {
        public override string CultureName => "kr";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ks : FormatTest
    {
        public override string CultureName => "ks";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ku : FormatTest
    {
        public override string CultureName => "ku";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ky : FormatTest
    {
        public override string CultureName => "ky";
    }

    [TestClass]
    public sealed class CultureFormatTest_La : FormatTest
    {
        public override string CultureName => "la";
    }

    [TestClass]
    public sealed class CultureFormatTest_Lg : FormatTest
    {
        public override string CultureName => "lg";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ln : FormatTest
    {
        public override string CultureName => "ln";
    }

    [TestClass]
    public sealed class CultureFormatTest_Lo : FormatTest
    {
        public override string CultureName => "lo";
    }

    [TestClass]
    public sealed class CultureFormatTest_Lu : FormatTest
    {
        public override string CultureName => "lu";
    }

    [TestClass]
    public sealed class CultureFormatTest_Lv : FormatTest
    {
        public override string CultureName => "lv";
    }

    [TestClass]
    public sealed class CultureFormatTest_Mg : FormatTest
    {
        public override string CultureName => "mg";
    }

    [TestClass]
    public sealed class CultureFormatTest_Mi : FormatTest
    {
        public override string CultureName => "mi";
    }

    [TestClass]
    public sealed class CultureFormatTest_Mk : FormatTest
    {
        public override string CultureName => "mk";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ml : FormatTest
    {
        public override string CultureName => "ml";
    }

    [TestClass]
    public sealed class CultureFormatTest_Mn : FormatTest
    {
        public override string CultureName => "mn";
    }

    [TestClass]
    public sealed class CultureFormatTest_Mr : FormatTest
    {
        public override string CultureName => "mr";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ms : FormatTest
    {
        public override string CultureName => "ms";
    }

    [TestClass]
    public sealed class CultureFormatTest_My : FormatTest
    {
        public override string CultureName => "my";
    }

    [TestClass]
    public sealed class CultureFormatTest_Nb : FormatTest
    {
        public override string CultureName => "nb";
    }

    [TestClass]
    public sealed class CultureFormatTest_No : FormatTest
    {
        public override string CultureName => "no";
    }

    [TestClass]
    public sealed class CultureFormatTest_Nd : FormatTest
    {
        public override string CultureName => "nd";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sn : FormatTest
    {
        public override string CultureName => "sn";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ne : FormatTest
    {
        public override string CultureName => "ne";
    }

    [TestClass]
    public sealed class CultureFormatTest_Nl : FormatTest
    {
        public override string CultureName => "nl";
    }

    [TestClass]
    public sealed class CultureFormatTest_Nn : FormatTest
    {
        public override string CultureName => "nn";
    }

    [TestClass]
    public sealed class CultureFormatTest_Oc : FormatTest
    {
        public override string CultureName => "oc";
    }

    [TestClass]
    public sealed class CultureFormatTest_Os : FormatTest
    {
        public override string CultureName => "os";
    }

    [TestClass]
    public sealed class CultureFormatTest_Pl : FormatTest
    {
        public override string CultureName => "pl";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ps : FormatTest
    {
        public override string CultureName => "ps";
    }

    [TestClass]
    public sealed class CultureFormatTest_Pt : FormatTest
    {
        public override string CultureName => "pt";
    }

    [TestClass]
    public sealed class CultureFormatTest_Rm : FormatTest
    {
        public override string CultureName => "rm";
    }

    [TestClass]
    public sealed class CultureFormatTest_Rn : FormatTest
    {
        public override string CultureName => "rn";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ro : FormatTest
    {
        public override string CultureName => "ro";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ru : FormatTest
    {
        public override string CultureName => "ru";
    }

    [TestClass]
    public sealed class CultureFormatTest_Rw : FormatTest
    {
        public override string CultureName => "rw";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sa : FormatTest
    {
        public override string CultureName => "sa";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sd : FormatTest
    {
        public override string CultureName => "sd";
    }

    [TestClass]
    public sealed class CultureFormatTest_Se : FormatTest
    {
        public override string CultureName => "se";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sg : FormatTest
    {
        public override string CultureName => "sg";
    }

    [TestClass]
    public sealed class CultureFormatTest_Si : FormatTest
    {
        public override string CultureName => "si";
    }

    [TestClass]
    public sealed class CultureFormatTest_So : FormatTest
    {
        public override string CultureName => "so";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sq : FormatTest
    {
        public override string CultureName => "sq";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sr : FormatTest
    {
        public override string CultureName => "sr";
    }

    [TestClass]
    public sealed class CultureFormatTest_Sv : FormatTest
    {
        public override string CultureName => "sv";
    }

    [TestClass]
    public sealed class CultureFormatTest_Tg : FormatTest
    {
        public override string CultureName => "tg";
    }

    [TestClass]
    public sealed class CultureFormatTest_Th : FormatTest
    {
        public override string CultureName => "th";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ti : FormatTest
    {
        public override string CultureName => "ti";
    }

    [TestClass]
    public sealed class CultureFormatTest_Tk : FormatTest
    {
        public override string CultureName => "tk";
    }

    [TestClass]
    public sealed class CultureFormatTest_Tn : FormatTest
    {
        public override string CultureName => "tn";
    }

    [TestClass]
    public sealed class CultureFormatTest_Xh : FormatTest
    {
        public override string CultureName => "xh";
    }

    [TestClass]
    public sealed class CultureFormatTest_To : FormatTest
    {
        public override string CultureName => "to";
    }

    [TestClass]
    public sealed class CultureFormatTest_Tr : FormatTest
    {
        public override string CultureName => "tr";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ts : FormatTest
    {
        public override string CultureName => "ts";
    }

    [TestClass]
    public sealed class CultureFormatTest_Uk : FormatTest
    {
        public override string CultureName => "uk";
    }

    [TestClass]
    public sealed class CultureFormatTest_Ur : FormatTest
    {
        public override string CultureName => "ur";
    }

    [TestClass]
    public sealed class CultureFormatTest_Uz : FormatTest
    {
        public override string CultureName => "uz";
    }

    [TestClass]
    public sealed class CultureFormatTest_Vi : FormatTest
    {
        public override string CultureName => "vi";
    }

    [TestClass]
    public sealed class CultureFormatTest_Vo : FormatTest
    {
        public override string CultureName => "vo";
    }

    [TestClass]
    public sealed class CultureFormatTest_Yi : FormatTest
    {
        public override string CultureName => "yi";
    }

    [TestClass]
    public sealed class CultureFormatTest_Wo : FormatTest
    {
        public override string CultureName => "wo";
    }

    [TestClass]
    public sealed class CultureFormatTest_Zu : FormatTest
    {
        public override string CultureName => "zu";
    }

#endif

    #endregion Cultures
}