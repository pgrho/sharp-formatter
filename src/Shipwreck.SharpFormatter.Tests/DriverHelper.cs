using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.PhantomJS;
using System;
using System.Collections.Generic;

namespace Shipwreck.SharpFormatter.Tests
{
    [TestClass]
    public sealed class DriverHelper
    {
        private static Dictionary<string, PhantomJSDriver> _Drivers = new Dictionary<string, PhantomJSDriver>();

        public static PhantomJSDriver GetDriver(string fileName)
        {
            PhantomJSDriver d;
            if (!_Drivers.TryGetValue(fileName, out d))
            {
                d = new PhantomJSDriver();
                d.Navigate().GoToUrl(new Uri(new Uri(typeof(DriverHelper).Assembly.Location), fileName).ToString());
                _Drivers[fileName] = d;
            }
            return d;
        }

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
    }
}