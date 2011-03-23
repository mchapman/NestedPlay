module NestedForm
  class Builder < ::ActionView::Helpers::FormBuilder
    def link_to_add(name, association)

      def build_section(association, type, model_object)
        output = %Q[<div id="#{association}_fields_#{type}_blueprint" style="display: none">].html_safe
        output << fields_for(association, model_object, :child_index => "new_#{association}", &@fields[association])
        output.safe_concat('</div>')
        output
      end

      @fields ||= {}
      @template.after_nested_form(association) do
        model_object = object.class.reflect_on_association(association).klass.new
        joint_output = build_section(association,'edit',model_object)
        model_object.id = 1
        joint_output << build_section(association,'view',model_object)
        joint_output
      end
      @template.link_to(name, "javascript:void(0)", :class => "add_nested_fields", "data-association" => association)
    end

    def link_to_stash(name, association)
      @template.link_to(name, "javascript:void(0)", :class => "stash_nested_fields", "data-association" => association)
    end

    def link_to_remove(name)
      hidden_field(:_destroy) + @template.link_to(name, "javascript:void(0)", :class => "remove_nested_fields")
    end

    def fields_for_with_nested_attributes(association, args, block)
      @fields ||= {}
      @fields[association] = block
      super
    end

    def fields_for_nested_model(name, association, args, block)
      output = '<div class="fields">'.html_safe
      output << super
      output.safe_concat('</div>')
      output
    end
  end
end