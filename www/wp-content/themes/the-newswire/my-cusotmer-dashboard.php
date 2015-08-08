<?php
/**
 * Template Name: My Dashboard
 * Description: Custom dashboard in full-width
 */
get_header(); ?>

    <div id="content" class="clearfix full-width-content">

        <div id="main" class="clearfix" role="main">

				<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'content', 'page' ); ?>

				<a href="/profile">My Profile</a>

				<?php comments_template( '', true ); ?>

				<?php endwhile; // end of the loop. ?>

			</div>
		</div>

<?php get_footer(); ?>

<script>
</script>
<style>
</style>
