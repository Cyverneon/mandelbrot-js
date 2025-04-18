function mandelbrot()
{
    var x_range = 3.00;
    var x_offset = -2.0;
    var y_range = 3.00;
    var y_offset = -1.5;
    var max_iterations = 100;

    var image_w = 900;
    var image_h = 750;
    var arr = new Uint8ClampedArray(image_w*image_h*4);

    for (let pixel_y = 0; pixel_y < image_h; pixel_y++)
    {
        for (let pixel_x = 0; pixel_x < image_w; pixel_x++)
        {
            // scale coordinates to lie inside range used for mandelbrot
            var x0 = ((pixel_x / image_w) * x_range) + x_offset;
            var y0 = ((pixel_y / image_h) * y_range) + y_offset;

            var x = 0.0;
            var y = 0.0;

            var iterations = 0;

            while(((x*x) + (y*y)) < 4 && iterations < max_iterations)
            {
                var x_temp = x*x - y*y + x0;
                y = 2*x*y+y0;
                x = x_temp;
                iterations++;
            }

            var i = ((pixel_y * image_w) + pixel_x)*4;
            if (iterations < max_iterations)
            {
                arr[i]   = 32;
                arr[i+1] = 32;
                arr[i+2] = 48;
                arr[i+3] = 255;
            }
            else
            {
                arr[i]   = 0;
                arr[i+1] = 0;
                arr[i+2] = 0;
                arr[i+3] = 255;
            }
        }
    }

    return new ImageData(arr, image_w);
}

function test()
{
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var cw = canvas.width;
    var ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);
    var t0 = new Date();
    ctx.putImageData(mandelbrot(), 20, 20);
    var t1 = new Date();
    console.log('mandelbrot time: ' + (t1.getMilliseconds() - t0.getMilliseconds()));
 
}


