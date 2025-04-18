var default_x_range = 3.00;
var default_x_offset = -2.0;
var default_y_range = 3.00;
var default_y_offset = -1.5;

var max_iterations = 50;

function lerp(a, b, t)
{
    return a + ((b-a) * t);
}

function get_colours()
{
    var col1 = [32, 32, 48];
    var col2 = [68, 68, 102];
    var col_arr = new Array();
    for (let i = 0; i < max_iterations; i++)
    {
        var lerp_var = i / max_iterations;
        col_arr.push([
            lerp(col1[0], col2[0], lerp_var),
            lerp(col1[1], col2[1], lerp_var),
            lerp(col1[2], col2[2], lerp_var)
        ]);
    }
    return col_arr;
}

function mandelbrot(image_w, image_h, zoom_amount)
{
    var x_range = default_x_range/zoom_amount;
    var x_offset = default_x_offset/zoom_amount;
    var y_range = default_y_range/zoom_amount;
    var y_offset = default_y_offset/zoom_amount;
    
    var arr = new Uint8ClampedArray(image_w*image_h*4);

    var surround_col_arr = get_colours();
    var mandelbrot_col = [18, 18, 28];

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
                arr[i]   = surround_col_arr[iterations][0];
                arr[i+1] = surround_col_arr[iterations][1];
                arr[i+2] = surround_col_arr[iterations][2];
                arr[i+3] = 255;
            }
            else
            {
                arr[i]   = mandelbrot_col[0];
                arr[i+1] = mandelbrot_col[1];
                arr[i+2] = mandelbrot_col[2];
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
    ctx.putImageData(mandelbrot(cw, ch, 1), 20, 20);
    var t1 = new Date();
    console.log('mandelbrot time: ' + (t1.getMilliseconds() - t0.getMilliseconds()));
 
}


