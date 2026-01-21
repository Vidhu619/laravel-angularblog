<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    // Admin: create blog
    public function store(Request $request)
    {
        return Blog::create($request->all());
    }

    // Admin: list all
    public function index()
    {
        return Blog::all();
    }

    // Admin: update
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->update($request->all());
        return $blog;
    }

    // Admin: delete
    public function destroy($id)
    {
        Blog::destroy($id);
        return response()->json(['message'=>'Deleted']);
    }

    // User: get unseen blogs
    public function unseen(Request $request)
    {
        $user = $request->user();

        return Blog::whereNotIn('id', function($q) use ($user){
            $q->select('blog_id')
              ->from('blog_views')
              ->where('user_id', $user->id);
        })->get();
    }

    // User: mark as viewed
  public function markViewed(Request $request, $id)
{
    $request->user()
            ->viewedBlogs()
            ->syncWithoutDetaching([$id]);

    return response()->json(['message' => 'Marked as read']);
}
}

