"""Generate assets/img/chef-depth.png (white = near) for the hero Spatial Scene.

Usage (from repo root):
  pip install onnxruntime numpy pillow
  curl -L -o /tmp/da2s.onnx \
    https://github.com/fabio-sim/Depth-Anything-ONNX/releases/download/v2.0.0/depth_anything_v2_vits.onnx
  python3 tools/make_depth.py /tmp/da2s.onnx [assets/img/chef.jpg] [assets/img/chef-depth.png]
"""
import sys

import numpy as np
import onnxruntime as ort
from PIL import Image, ImageFilter

model = sys.argv[1]
src = sys.argv[2] if len(sys.argv) > 2 else "assets/img/chef.jpg"
out = sys.argv[3] if len(sys.argv) > 3 else "assets/img/chef-depth.png"

session = ort.InferenceSession(model)
im = Image.open(src).convert("RGB")
w, h = im.size

# The model takes a fixed 518x518 input; squash, then stretch the result back.
x = np.asarray(im.resize((518, 518), Image.BICUBIC), dtype=np.float32) / 255.0
x = (x - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
x = x.transpose(2, 0, 1)[None].astype(np.float32)
d = session.run(None, {session.get_inputs()[0].name: x})[0].squeeze()
d = (d - d.min()) / (d.max() - d.min())

depth = Image.fromarray((d * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
depth.filter(ImageFilter.GaussianBlur(1.5)).save(out, optimize=True)
print("Wrote", out)
