using System.Web;
using System.Web.Optimization;

namespace QMS
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {


            bundles.Add(new ScriptBundle("~/Js/bundles/jquery")
.Include("~/Js/Aismain.js")
.Include("~/js/SmoothScroll.min.js")
.Include("~/js/bootstrap.js")
.Include("~/js/easing.js")
.Include("~/js/edulearn.js")
.Include("~/js/jquery-2.2.3.min.js")
.Include("~/js/move-top.js")
.Include("~/js/timeSpeeder-1.0.js")
.Include("~/Js/service.js")
);
            bundles.Add(new ScriptBundle("~/bundles/Admin")
                 .Include("~/Js/Admin.js")
           .Include("~/Js/service.js")
            .Include("~/Js/QuestionMaster.js")
           .Include("~/js/SmoothScroll.min.js")
           .Include("~/js/bootstrap.js")
           .Include("~/js/easing.js")
           .Include("~/js/edulearn.js")
           .Include("~/js/jquery-2.2.3.min.js")
           .Include("~/js/move-top.js")
           .Include("~/js/timeSpeeder-1.0.js")
           );
            bundles.Add(new ScriptBundle("~/bundles/Client")
 .Include("~/Js/Quiz.js")
 .Include("~/Js/Aismain.js")
.Include("~/js/SmoothScroll.min.js")
.Include("~/js/bootstrap.js")
.Include("~/js/easing.js")
.Include("~/js/edulearn.js")
.Include("~/js/jquery-2.2.3.min.js")
.Include("~/js/move-top.js")
.Include("~/js/timeSpeeder-1.0.js")
.Include("~/Js/service.js")



);

            //http://mynutbolt.com/favicon.ico (expiration not specified)
            //http://mynutbolt.com/images/move-top.png (expiration not specified)



            //http://mynutbolt.com/webfonts/fa-brands-400.ttf (expiration not specified)
            //http://mynutbolt.com/webfonts/fa-solid-900.ttf (expiration not specified)


            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                   "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));


            bundles.Add(new StyleBundle("~/bundles/css")
.Include("~/css/bootstrap.css")
.Include("~/css/fontawesome-all.css")
.Include("~/css/mislider-custom.css")
.Include("~/css/mislider.css")
.Include("~/css/style.css")
.Include("~/css/mislider-custom.css")
.Include("~/css/mislider.css")
.Include("~/css/style.css")

);

        }
    }
}
