package io.github.iethem.firebase;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.GzipResourceResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
	

	@GetMapping("/error")
  public String error() {
      return "Error handling";
  }
    
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry
		.addViewController("/")
		.setViewName("forward:/index.html");
    // If you need different routing uncomment below lines and edit your own settings
		// registry
		// 	.addViewController("/management")
		// 	.setViewName("forward:/index.html");
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry
		  .addResourceHandler("*.js")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.html")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.js.gz")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.svg")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.jpg")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.png")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.json")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.ttf")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.eot")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.woff")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.woff2")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
		registry
		  .addResourceHandler("*.ico")
		    .addResourceLocations("classpath:/web/")
		    .resourceChain(true)
		    .addResolver(new GzipResourceResolver())
		    .addResolver(new PathResourceResolver());
	}
}