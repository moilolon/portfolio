# Draws the README cover (1600x1000, dark) into assets/cover.png, from shapes.
# Run from the repository root: powershell -NoProfile -File assets/draw-cover.ps1
Add-Type -AssemblyName System.Drawing

$assets = Split-Path -Parent $MyInvocation.MyCommand.Path

function Get-Color([string]$hex, [int]$alpha = 255) {
  $c = [System.Drawing.ColorTranslator]::FromHtml($hex)
  return [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B)
}

$ground = Get-Color '#1E222A'
$frame = Get-Color '#181B22'
$sheet = Get-Color '#2C313C'
$line = Get-Color '#565E6E'

function New-RoundedPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Fill-Rounded($g, $color, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $brush = New-Object System.Drawing.SolidBrush $color
  $path = New-RoundedPath $x $y $w $h $r
  $g.FillPath($brush, $path)
  $brush.Dispose(); $path.Dispose()
}

function Fill-Gradient($g, $from, $to, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.PointF $x, $y), (New-Object System.Drawing.PointF ($x + $w), ($y + $h)), $from, $to)
  $path = New-RoundedPath $x $y $w $h $r
  $g.FillPath($brush, $path)
  $brush.Dispose(); $path.Dispose()
}

function Write-Text($g, [string]$text, [string]$font, [float]$size, $color, [float]$x, [float]$y) {
  $f = New-Object System.Drawing.Font($font, $size)
  $b = New-Object System.Drawing.SolidBrush $color
  $g.DrawString($text, $f, $b, $x, $y)
  $f.Dispose(); $b.Dispose()
}

function Draw-Lines($g, [float]$x, [float]$y, [float]$w, [float[]]$fractions, [float]$gap) {
  foreach ($fraction in $fractions) {
    Fill-Rounded $g $line $x $y ($w * $fraction) 8 4
    $y += $gap
  }
}

# The common cover: dark ground with the accent's glow, the icon, the name and three lines on
# the left; the window on the right, where each repo draws its own picture.
function New-Cover([string]$accent, [string]$accentDark, [string]$title, [string[]]$text) {
  $bitmap = New-Object System.Drawing.Bitmap 1600, 1000
  $g = [System.Drawing.Graphics]::FromImage($bitmap)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear($ground)
  $glow = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Point 0, 0), (New-Object System.Drawing.Point 1600, 1000), (Get-Color $accent 70), (Get-Color $accent 0))
  $g.FillRectangle($glow, 0, 0, 1600, 1000)
  $glow.Dispose()
  Fill-Gradient $g (Get-Color $accent) (Get-Color $accentDark) 120 250 120 120 26
  Write-Text $g $title 'Segoe UI Semibold' 60 (Get-Color '#ECEFF4') 112 400
  for ($i = 0; $i -lt $text.Count; $i++) {
    Write-Text $g $text[$i] 'Segoe UI' 28 (Get-Color '#A0A8B6') 120 (520 + $i * 46)
  }
  Fill-Rounded $g $frame 900 90 580 820 28
  for ($i = 0; $i -lt 3; $i++) { Fill-Rounded $g $line (936 + $i * 40) 122 22 22 11 }
  return @($bitmap, $g)
}

function Save-Cover($canvas) {
  $canvas[1].Dispose()
  $canvas[0].Save((Join-Path $assets 'cover.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas[0].Dispose()
  Write-Output 'cover.png written'
}

$canvas = New-Cover '#37D6C4' '#8B7BFF' 'Portfolio' @('Skills, experience and projects', 'in English and Spanish, with a', 'contact form that reaches my inbox.')
$g = $canvas[1]

# The icon: the favicon every moilolon.com site uses (src/app/icon.svg), a 64-unit square.
$scale = 120 / 64
Fill-Rounded $g $ground 118 248 124 124 (16 * $scale + 2)
Fill-Rounded $g (Get-Color '#08090D') 120 250 120 120 (16 * $scale)
$mark = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.PointF 120, 250), (New-Object System.Drawing.PointF 240, 370), (Get-Color '#8B7BFF'), (Get-Color '#37D6C4'))
$pen = New-Object System.Drawing.Pen($mark, (5.5 * $scale))
$pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$points = @(@(16, 44), @(16, 22), @(26, 35), @(32, 27), @(38, 35), @(48, 22), @(48, 44)) | ForEach-Object {
  New-Object System.Drawing.PointF (120 + $_[0] * $scale), (250 + $_[1] * $scale)
}
$g.DrawLines($pen, [System.Drawing.PointF[]]$points)
$mark.Dispose(); $pen.Dispose()

# The page: who I am, the technology chips, the experience cards and the contact button,
# in the favicon's violet and turquoise.
$violet = Get-Color '#8B7BFF'
$turquoise = Get-Color '#37D6C4'
Fill-Rounded $g $sheet 930 176 520 700 18
Fill-Gradient $g $violet $turquoise 962 206 96 96 48
Fill-Rounded $g (Get-Color '#ECEFF4') 1082 222 220 26 10
Fill-Rounded $g $line 1082 262 150 14 7
$chips = @('#3178C6', '#61DAFB', '#06B6D4', '#3FCF8E', '#F7DF1E', '#E34F26', '#8B7BFF', '#EB6E6E')
for ($i = 0; $i -lt $chips.Count; $i++) {
  $col = $i % 4; $row = [math]::Floor($i / 4)
  Fill-Rounded $g (Get-Color $chips[$i] 200) (962 + $col * 116) (336 + $row * 48) 100 32 16
}
for ($i = 0; $i -lt 3; $i++) {
  $y = 450 + $i * 116
  Fill-Rounded $g (Get-Color '#363C49') 962 $y 456 100 14
  Fill-Gradient $g $violet $turquoise 986 ($y + 22) 56 56 12
  Draw-Lines $g 1064 ($y + 28) 330 @(0.75, 0.5) 30
}
Fill-Gradient $g $violet $turquoise 1270 810 148 44 22

Save-Cover $canvas
